package com.miyabi.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.miyabi.models.Payments;
import com.miyabi.models.Reservation;
import com.miyabi.repository.PaymentsRepository;
import com.miyabi.service.ReservationService;

/**
 * Controlador REST principal para el motor de reservas.
 * Gestiona la disponibilidad del calendario, la creación de nuevas reservas,
 * la actualización de estados y la consulta completa para administradores.
 */
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    private final PaymentsRepository paymentsRepository;

    public ReservationController(ReservationService reservationService, PaymentsRepository paymentsRepository) {
        this.reservationService = reservationService;
        this.paymentsRepository = paymentsRepository;
    }
    
    @GetMapping("/availability")
    public ResponseEntity<Map<String, Object>> getMonthAvailability(@RequestParam int year, @RequestParam int month) {
        Map<String, Object> mockResponse = new HashMap<>();
        Map<String, Object> dayInfo = new HashMap<>();
        dayInfo.put("available", true);
        dayInfo.put("minPrice", 165000);
        mockResponse.put("2026-02-25", dayInfo);
        return ResponseEntity.ok(mockResponse);
    }

    @GetMapping("/unavailable-dates")
    public ResponseEntity<List<String>> getUnavailableDates() {
        List<Reservation> activeReservations = reservationService.findAll().stream()
                .filter(r -> !"Cancelled".equalsIgnoreCase(r.getState()))
                .collect(Collectors.toList());

        Map<LocalDate, Integer> dailyOccupancy = new HashMap<>();

        for (Reservation res : activeReservations) {
            LocalDate current = res.getEntryDate();
            while (current != null && res.getDepartureDate() != null && current.isBefore(res.getDepartureDate())) {
                dailyOccupancy.put(current, dailyOccupancy.getOrDefault(current, 0) + 1);
                current = current.plusDays(1);
            }
        }

        int TOTAL_ROOMS = 6;
        List<String> unavailableDates = new ArrayList<>();

        for (Map.Entry<LocalDate, Integer> entry : dailyOccupancy.entrySet()) {
            if (entry.getValue() >= TOTAL_ROOMS) {
                unavailableDates.add(entry.getKey().toString()); 
            }
        }

        return ResponseEntity.ok(unavailableDates);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Integer id) {
        Reservation r = reservationService.findById(id);
        if (r != null) return ResponseEntity.ok(r);
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/guest/{idGuest}")
    public List<Reservation> getReservationsByGuest(@PathVariable Integer idGuest) {
        return reservationService.findByGuest_IdGuest(idGuest);
    }

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable Integer id, @RequestBody Reservation details) {
        try {
            Reservation updated = reservationService.updateReservation(id, details);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReservation(@PathVariable Integer id) {
        try {
            reservationService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
    
    @PostMapping("/confirm")
    public ResponseEntity<?> confirmBooking(@RequestBody Map<String, Object> payload) {
        try {
            // 1. RASTREADOR: Imprimimos en la consola de Spring lo que envió Angular
            System.out.println("==== PAYLOAD RECIBIDO DESDE ANGULAR ====");
            System.out.println(payload);

            Reservation reservation = reservationService.createReservationFromMap(payload);

            Payments payment = new Payments();
            payment.setReservation(reservation);
            payment.setTotalAmount(reservation.getTotalPay());
            payment.setPaymentMethod((String) payload.getOrDefault("paymentMethod", "Tarjeta"));
            payment.setObservation("Reserva confirmada vía web");
            payment.setPaymentStatus("Paid"); 
            
            try {
                paymentsRepository.save(payment);
            } catch (Exception ex) {
                // 2. RASTREADOR: Si explota aquí, la entidad Payments está mal diseñada
                throw new RuntimeException("ERROR DE PAGOS: Falló al guardar el Pago. ¿La entidad Payments tiene @GeneratedValue en su llave primaria?", ex);
            }

            return ResponseEntity.ok(Map.of(
                "message", "Reserva confirmada con éxito",
                "reservationCode", reservation.getReservationCode()
            ));
        } catch (Exception e) {
            e.printStackTrace(); // Imprime la traza completa del error en tu terminal
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}