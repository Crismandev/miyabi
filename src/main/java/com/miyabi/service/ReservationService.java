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
        Guest existingGuest = null;

        if (reservation.getGuest() != null && reservation.getGuest().getIdGuest() != null && reservation.getGuest().getIdGuest() > 0) {
            existingGuest = guestService.findById(reservation.getGuest().getIdGuest());
        }

        if (existingGuest == null && reservation.getGuest() != null && reservation.getGuest().getEmail() != null) {
            existingGuest = guestRepository.findByEmail(reservation.getGuest().getEmail()).orElse(null);
        }

        if (existingGuest == null) {
            List<Guest> allGuests = guestService.findAll();
            if (!allGuests.isEmpty()) {
                existingGuest = allGuests.get(0);
            }
        }

        if (existingGuest != null) {
            Guest incomingData = reservation.getGuest();
            if (incomingData != null) {
                if (incomingData.getPhone() != null && !incomingData.getPhone().isBlank()) existingGuest.setPhone(incomingData.getPhone());
                if (incomingData.getMobilePhone() != null && !incomingData.getMobilePhone().isBlank()) existingGuest.setMobilePhone(incomingData.getMobilePhone());
                if (incomingData.getAddress() != null && !incomingData.getAddress().isBlank()) existingGuest.setAddress(incomingData.getAddress());
                if (incomingData.getCountry() != null && !incomingData.getCountry().isBlank()) existingGuest.setCountry(incomingData.getCountry());
                if (incomingData.getCity() != null && !incomingData.getCity().isBlank()) existingGuest.setCity(incomingData.getCity());
                if (incomingData.getPostalCode() != null && !incomingData.getPostalCode().isBlank()) existingGuest.setPostalCode(incomingData.getPostalCode());
            }

            guestService.save(existingGuest);
            reservation.setGuest(existingGuest);
        } else {
            throw new RuntimeException("La reserva debe estar asociada a un cliente logueado.");
        }

        int adults = reservation.getNumAdults() != null ? reservation.getNumAdults() : 1;
        int children = reservation.getNumChildren() != null ? reservation.getNumChildren() : 0;
        int totalGuests = adults + children;

        if (totalGuests > 6) {
            throw new RuntimeException("No aceptamos reservas para más de 6 personas en un grupo.");
        }
        if (adults < 1) {
            throw new RuntimeException("Debe haber al menos 1 adulto en la reserva.");
        }

        Room roomToReserve = roomService.findById(reservation.getRoom().getIdRoom());
        if (roomToReserve == null) {
            throw new RuntimeException("La habitación no existe.");
        }

        long nights = ChronoUnit.DAYS.between(reservation.getEntryDate(), reservation.getDepartureDate());
        if (nights <= 0) nights = 1;
        reservation.setNumberNights((int) nights);

        BigDecimal nightsDecimal = new BigDecimal(nights);
        BigDecimal pricePerNight = reservation.getPricePerNight() != null ? reservation.getPricePerNight() : (roomToReserve.getRoomType() != null ? roomToReserve.getRoomType().getBasePrice() : new BigDecimal("150.00"));
        reservation.setPricePerNight(pricePerNight);
        BigDecimal subtotal = pricePerNight.multiply(nightsDecimal);
        reservation.setRoomSubtotal(subtotal);
        reservation.setTotalPay(subtotal);

        String code = "RES-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        reservation.setReservationCode(code);
        if (reservation.getState() == null || reservation.getState().isBlank()) {
            reservation.setState("Pending");
        }

        return reservationRepository.save(reservation);
    }

    public Reservation createReservationFromMap(Map<String, Object> payload) {
        Reservation res = new Reservation();

        res.setEntryDate(LocalDate.parse((String) payload.get("entryDate")));
        res.setDepartureDate(LocalDate.parse((String) payload.get("departureDate")));
        res.setPricePerNight(new BigDecimal(payload.get("pricePerNight").toString()));
        res.setNumAdults(payload.get("numAdults") != null ? (Integer) payload.get("numAdults") : 1);
        res.setObservations((String) payload.get("observations"));

        Map<String, Object> guestMap = (Map<String, Object>) payload.get("guest");
        Guest guest = new Guest();
        if (guestMap != null && guestMap.get("idGuest") != null) {
            guest.setIdGuest((Integer) guestMap.get("idGuest"));
        }
        res.setGuest(guest);

        Map<String, Object> roomMap = (Map<String, Object>) payload.get("room");
        Room room = new Room();
        if (roomMap != null && roomMap.get("idRoom") != null) {
            room.setIdRoom((Integer) roomMap.get("idRoom"));
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