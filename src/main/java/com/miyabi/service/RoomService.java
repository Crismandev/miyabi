package com.miyabi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.miyabi.models.Reservation;
import com.miyabi.models.Room;
import com.miyabi.repository.ConsumptionRepository;
import com.miyabi.repository.PaymentsRepository;
import com.miyabi.repository.ReservationRepository;
import com.miyabi.repository.RoomRepository;

/**
 * Servicio encargado de la gestión de las habitaciones físicas.
 * Controla el inventario real y el estado operativo de cada cuarto del hotel.
 */
@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final ReservationRepository reservationRepository;
    private final PaymentsRepository paymentsRepository;
    private final ConsumptionRepository consumptionRepository;

    /**
     * Inyección por constructor de repositorios necesarios para eliminaciones seguras en cascada.
     */
    public RoomService(RoomRepository roomRepository,
                       ReservationRepository reservationRepository,
                       PaymentsRepository paymentsRepository,
                       ConsumptionRepository consumptionRepository) {
        this.roomRepository = roomRepository;
        this.reservationRepository = reservationRepository;
        this.paymentsRepository = paymentsRepository;
        this.consumptionRepository = consumptionRepository;
    }

    /**
     * Recupera todas las habitaciones registradas, sin importar su estado.
     */
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    /**
     * LÓGICA DE DISPONIBILIDAD:
     * Filtra y retorna únicamente las habitaciones cuyo estado es "Available".
     */
    public List<Room> findAvailableRooms() {
        return roomRepository.findByState("Available");
    }

    /**
     * Busca una habitación específica por su identificador único.
     */
    public Room findById(Integer id) {
        return roomRepository.findById(id).orElse(null);
    }

    /**
     * Guarda o actualiza la información de una habitación.
     */
    public Room save(Room room) {
        return roomRepository.save(room);
    }

    /**
     * Elimina una habitación específica por su identificador único de la base de datos real.
     * Limpia de forma transaccional las dependencias (reservas, pagos, consumos) para evitar
     * fallos de llave foránea (Foreign Key Violation).
     * @param id Identificador de la habitación a eliminar.
     */
    @Transactional
    public void deleteById(Integer id) {
        if (id == null) return;
        Room room = roomRepository.findById(id).orElse(null);
        if (room != null) {
            // 1. Eliminar reservas asociadas a esta habitación y sus registros dependientes
            List<Reservation> reservations = reservationRepository.findByRoom_IdRoom(id);
            for (Reservation res : reservations) {
                if (res.getReservationId() != null) {
                    paymentsRepository.deleteByReservation_ReservationId(res.getReservationId());
                    consumptionRepository.deleteByReservation_ReservationId(res.getReservationId());
                }
                reservationRepository.delete(res);
            }
            // 2. Eliminar la habitación físicamente de la BD
            roomRepository.delete(room);
        }
    }
}