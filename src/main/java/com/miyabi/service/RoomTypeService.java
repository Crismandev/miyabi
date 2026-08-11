package com.miyabi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.miyabi.models.Room;
import com.miyabi.models.RoomType;
import com.miyabi.repository.RoomImageRepository;
import com.miyabi.repository.RoomRepository;
import com.miyabi.repository.RoomTypeRepository;

/**
 * Servicio encargado de gestionar las categorías o tipos de habitación.
 * Actúa como el motor del catálogo comercial, manejando la información de 
 * precios, capacidades y descripción de servicios (amenities).
 */
@Service
public class RoomTypeService {

    private final RoomTypeRepository roomTypeRepository;
    private final RoomRepository roomRepository;
    private final RoomImageRepository roomImageRepository;
    private final RoomService roomService;

    /**
     * Inyección de dependencias por constructor.
     */
    public RoomTypeService(RoomTypeRepository roomTypeRepository,
                           RoomRepository roomRepository,
                           RoomImageRepository roomImageRepository,
                           RoomService roomService) {
        this.roomTypeRepository = roomTypeRepository;
        this.roomRepository = roomRepository;
        this.roomImageRepository = roomImageRepository;
        this.roomService = roomService;
    }
    
    /**
     * Busca una categoría específica por su ID.
     */
    public RoomType findById(Integer id) {
        return roomTypeRepository.findById(id).orElse(null);
    }

    /**
     * Recupera todas las categorías registradas.
     */
    public List<RoomType> findAll() {
        return roomTypeRepository.findAll();
    }

    /**
     * Guarda o actualiza una categoría de habitación.
     */
    public RoomType save(RoomType roomType) {
        return roomTypeRepository.save(roomType);
    }
    
    /**
     * Elimina de forma transaccional una categoría de la BD real.
     * Limpia previamente las imágenes y las habitaciones vinculadas a este tipo.
     * @param id Identificador de la categoría a eliminar.
     */
    @Transactional
    public void deleteById(Integer id) {
        if (id == null) return;
        RoomType type = roomTypeRepository.findById(id).orElse(null);
        if (type != null) {
            // 1. Eliminar imágenes asociadas
            roomImageRepository.deleteByRoomType_IdTipo(id);
            
            // 2. Eliminar habitaciones dependientes de este tipo
            List<Room> rooms = roomRepository.findByRoomType_IdTipo(id);
            for (Room r : rooms) {
                if (r.getIdRoom() != null) {
                    roomService.deleteById(r.getIdRoom());
                }
            }
            
            // 3. Eliminar la categoría físicamente
            roomTypeRepository.delete(type);
        }
    }
}