package com.miyabi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.miyabi.models.Rol;
import com.miyabi.models.User;
import com.miyabi.repository.RolRepository;
import com.miyabi.service.UserService;

/**
 * Controlador REST para la gestión de Usuarios Internos (Users).
 * Administra las operaciones CRUD para el personal del hotel.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final RolRepository rolRepository;

    public UserController(UserService userService, RolRepository rolRepository) {
        this.userService = userService;
        this.rolRepository = rolRepository;
    }

    /**
     * Endpoint GET: /api/users
     * Obtiene la lista completa de todo el personal registrado.
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    /**
     * Endpoint GET: /api/users/{id}
     * Busca los datos de un empleado por ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.findById(id);
        if (user != null) return ResponseEntity.ok(user);
        return ResponseEntity.notFound().build();
    }

    /**
     * Endpoint POST: /api/users
     * Registra a un nuevo empleado en el sistema.
     */
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            if (user.getRol() != null) {
                Integer rolId = user.getRol().getIdRol();
                if (rolId != null) {
                    Rol rol = rolRepository.findById(rolId).orElse(null);
                    if (rol != null) {
                        user.setRol(rol);
                    }
                }
            }
            if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                user.setPassword("1234");
            }
            User saved = userService.save(user);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage() != null ? e.getMessage() : "Error al crear usuario"));
        }
    }

    /**
     * Endpoint PUT: /api/users/{id}
     * Edita la información, estado o rol de un empleado existente.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User userDetails) {
        try {
            User user = userService.findById(id);
            if (user != null) {
                user.setNames(userDetails.getNames());
                user.setSurnames(userDetails.getSurnames());
                user.setEmail(userDetails.getEmail());
                user.setState(userDetails.getState());

                if (userDetails.getRol() != null) {
                    Integer rolId = userDetails.getRol().getIdRol();
                    if (rolId != null) {
                        Rol rol = rolRepository.findById(rolId).orElse(null);
                        if (rol != null) {
                            user.setRol(rol);
                        }
                    }
                }

                if (userDetails.getPassword() != null && !userDetails.getPassword().trim().isEmpty()) {
                    user.setPassword(userDetails.getPassword());
                }
                User saved = userService.save(user);
                return ResponseEntity.ok(saved);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage() != null ? e.getMessage() : "Error al actualizar usuario"));
        }
    }

    /**
     * Endpoint DELETE: /api/users/{id}
     * Elimina o inhabilita a un empleado del sistema.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            userService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage() != null ? e.getMessage() : "Error al eliminar usuario"));
        }
    }
}