package com.miyabi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.miyabi.models.User;
import com.miyabi.repository.AccessLogRepository;
import com.miyabi.repository.UserRepository;

/**
 * Servicio encargado de gestionar la lógica de negocio de los Usuarios (Personal del Hotel).
 * Administra el ciclo de vida de las cuentas del personal administrativo y operativo.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final AccessLogRepository accessLogRepository;

    /**
     * Inyección de dependencias por constructor.
     */
    public UserService(UserRepository userRepository, AccessLogRepository accessLogRepository) {
        this.userRepository = userRepository;
        this.accessLogRepository = accessLogRepository;
    }

    /**
     * Recupera la lista completa de empleados registrados en el sistema.
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * Busca un usuario específico por su identificador único.
     */
    public User findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    /**
     * Registra un nuevo empleado o actualiza los datos de uno existente.
     */
    public User save(User user) {
        return userRepository.save(user);
    }
    
    /**
     * Elimina de forma transaccional o deshabilita la cuenta de un usuario.
     * @param id Identificador del usuario a eliminar.
     */
    @Transactional
    public void deleteById(Integer id) {
        if (id == null) return;
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            try {
                // 1. Limpiar logs de acceso del usuario para evitar restricción FK
                accessLogRepository.deleteByUser_IdUsuario(id);
                // 2. Borrar físicamente si no tiene reservas vinculadas
                userRepository.delete(user);
            } catch (Exception e) {
                // 3. Fallback: Desactivar la cuenta de usuario (soft-delete) si tiene historial operativo
                user.setState(0);
                userRepository.save(user);
            }
        }
    }

    /**
     * Autentica a un usuario del personal (Admin/Recepcionista) por correo y contraseña.
     */
    public User authenticate(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}