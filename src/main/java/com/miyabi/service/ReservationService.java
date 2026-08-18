package com.miyabi.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.miyabi.models.Guest;
import com.miyabi.models.Reservation;
import com.miyabi.models.Room;
import com.miyabi.repository.ConsumptionRepository;
import com.miyabi.repository.GuestRepository;
import com.miyabi.repository.PaymentsRepository;
import com.miyabi.repository.ReservationRepository;

/**
 * Servicio principal del sistema Miyabi.
 * Orquestra la creación y gestión de reservas.
 */
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final RoomService roomService;
    private final GuestService guestService;
    private final GuestRepository guestRepository;
    private final PaymentsRepository paymentsRepository;
    private final ConsumptionRepository consumptionRepository;

    public ReservationService(ReservationRepository reservationRepository, 
                              RoomService roomService, 
                              GuestService guestService, 
                              GuestRepository guestRepository,
                              PaymentsRepository paymentsRepository,
                              ConsumptionRepository consumptionRepository) {
        this.reservationRepository = reservationRepository;
        this.roomService = roomService;
        this.guestService = guestService;
        this.guestRepository = guestRepository;
        this.paymentsRepository = paymentsRepository;
        this.consumptionRepository = consumptionRepository;
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Reservation findById(Integer id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public List<Reservation> findByGuest_IdGuest(Integer idGuest) {
        return reservationRepository.findByGuest_IdGuest(idGuest);
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {
        Guest incomingGuest = reservation.getGuest();
        Guest targetGuest = null;

        if (incomingGuest == null) {
            throw new RuntimeException("La reserva debe contener la información del huésped.");
        }

        if (incomingGuest.getIdGuest() != null && incomingGuest.getIdGuest() > 0) {
            targetGuest = guestService.findById(incomingGuest.getIdGuest());
        }

        if (targetGuest == null && incomingGuest.getEmail() != null && !incomingGuest.getEmail().isBlank()) {
            targetGuest = guestRepository.findByEmail(incomingGuest.getEmail()).orElse(null);
        }

        if (targetGuest == null) {
            targetGuest = guestRepository.save(incomingGuest);
        } else {
            if (incomingGuest.getNames() != null) targetGuest.setNames(incomingGuest.getNames());
            if (incomingGuest.getSurnames() != null) targetGuest.setSurnames(incomingGuest.getSurnames());
            if (incomingGuest.getPhone() != null) targetGuest.setPhone(incomingGuest.getPhone());
            if (incomingGuest.getDni() != null) targetGuest.setDni(incomingGuest.getDni());
            
            targetGuest = guestRepository.save(targetGuest);
        }

        reservation.setGuest(targetGuest);

        int adults = reservation.getNumAdults() != null ? reservation.getNumAdults() : 1;
        int children = reservation.getNumChildren() != null ? reservation.getNumChildren() : 0;
        int totalGuests = adults + children;

        if (totalGuests > 6) {
            throw new RuntimeException("No aceptamos reservas para más de 6 personas en un grupo.");
        }
        if (adults < 1) {
            throw new RuntimeException("Debe haber al menos 1 adulto en la reserva.");
        }

        Room roomData = reservation.getRoom();
        if (roomData == null || roomData.getIdRoom() == null || roomData.getIdRoom() == 0) {
            throw new RuntimeException("ERROR DE MAPEO: El ID de la habitación llegó nulo o en 0. Seleccione una habitación válida.");
        }

        Room roomToReserve = roomService.findById(roomData.getIdRoom());
        if (roomToReserve == null) {
            throw new RuntimeException("ERROR DE BASE DE DATOS: La habitación con ID " + roomData.getIdRoom() + " no existe.");
        }
        reservation.setRoom(roomToReserve);

        long nights = ChronoUnit.DAYS.between(reservation.getEntryDate(), reservation.getDepartureDate());
        if (nights <= 0) nights = 1;
        reservation.setNumberNights((int) nights);

        BigDecimal nightsDecimal = new BigDecimal(nights);
        BigDecimal pricePerNight = reservation.getPricePerNight() != null 
                ? reservation.getPricePerNight() 
                : (roomToReserve.getRoomType() != null ? roomToReserve.getRoomType().getBasePrice() : new BigDecimal("350.00"));
                
        reservation.setPricePerNight(pricePerNight);
        BigDecimal subtotal = pricePerNight.multiply(nightsDecimal);
        reservation.setRoomSubtotal(subtotal);
        reservation.setTotalPay(subtotal);

        String code = "RES-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        reservation.setReservationCode(code);
        if (reservation.getState() == null || reservation.getState().isBlank()) {
            reservation.setState("Confirmed");
        }

        return reservationRepository.save(reservation);
    }

    public Reservation createReservationFromMap(Map<String, Object> payload) {
        Reservation res = new Reservation();

        res.setEntryDate(LocalDate.parse((String) payload.get("entryDate")));
        res.setDepartureDate(LocalDate.parse((String) payload.get("departureDate")));

        if (payload.get("totalPay") != null) {
            res.setTotalPay(new BigDecimal(payload.get("totalPay").toString()));
        }

        res.setNumAdults(payload.get("numAdults") != null ? Integer.valueOf(payload.get("numAdults").toString()) : 1);
        res.setNumChildren(payload.get("numChildren") != null ? Integer.valueOf(payload.get("numChildren").toString()) : 0);

        Guest guest = new Guest();
        guest.setNames((String) payload.get("names"));
        guest.setSurnames((String) payload.get("surnames"));
        guest.setEmail((String) payload.get("email"));
        guest.setPhone((String) payload.get("phone"));
        
        if (payload.get("documentNumber") != null) {
            guest.setDni((String) payload.get("documentNumber"));
        }
        
        guest.setCity("No especificada");
        guest.setCountry("No especificado");
        guest.setAddress("No especificada");
        guest.setPassword("12345678");
        guest.setMobilePhone((String) payload.get("phone"));
        
        res.setGuest(guest);

        Room room = new Room();
        Object roomIdObj = payload.get("roomId");
        if (roomIdObj == null) roomIdObj = payload.get("idRoom");
        if (roomIdObj == null) roomIdObj = payload.get("idHabitacion");

        if (roomIdObj != null && !roomIdObj.toString().isBlank() && !roomIdObj.toString().equals("0")) {
            room.setIdRoom(Integer.valueOf(roomIdObj.toString()));
        }
        res.setRoom(room);

        return this.createReservation(res);
    }

    @Transactional
    public Reservation updateReservation(Integer id, Reservation details) {
        Reservation existing = findById(id);
        if (existing != null) {
            if (details.getState() != null && !details.getState().isBlank()) {
                existing.setState(details.getState());
            }
            if (details.getObservations() != null) {
                existing.setObservations(details.getObservations());
            }
            if (details.getEntryDate() != null) {
                existing.setEntryDate(details.getEntryDate());
            }
            if (details.getDepartureDate() != null) {
                existing.setDepartureDate(details.getDepartureDate());
            }
            return reservationRepository.save(existing);
        }
        return null;
    }

    @Transactional
    public void deleteById(Integer id) {
        if (id == null) return;
        paymentsRepository.deleteByReservation_ReservationId(id);
        consumptionRepository.deleteByReservation_ReservationId(id);
        reservationRepository.deleteById(id);
    }

    public Reservation findByCode(String code) {
        return reservationRepository.findByReservationCode(code);
    }

    public Reservation saveFromEmployee(Reservation reservation) {
        return reservationRepository.save(reservation);
    }
}