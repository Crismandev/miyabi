package com.miyabi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpSession;

import com.miyabi.models.Guest;
import com.miyabi.models.User;
import com.miyabi.service.GuestService;
import com.miyabi.service.UserService;

import java.util.Map;
import java.util.HashMap;

/**
 * Controlador REST encargado de la autenticación de los clientes (Huéspedes) y personal (Usuarios/Admins).
 * Maneja el inicio de sesión unificado, el registro, la verificación de sesión activa y el cierre de sesión.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final GuestService guestService;
    private final UserService userService;

    /**
     * Constructor para la Inyección de Dependencias.
     */
    public AuthController(GuestService guestService, UserService userService) {
        this.guestService = guestService;
        this.userService = userService;
    }

    /**
     * Endpoint POST: /api/auth/login
     * Autentica tanto a Huéspedes como a Personal del Hotel (Admin / Recepcionista).
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpSession session) {
        String email = credentials.get("email"); 
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email y contraseña son requeridos");
        }

        String cleanEmail = email.trim();

        // 1. Validar autenticación como Huésped (Guest)
        Guest authenticatedGuest = guestService.authenticate(cleanEmail, password);

        if (authenticatedGuest != null) {
            session.setAttribute("guestId", authenticatedGuest.getIdGuest());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login exitoso");
            response.put("guestName", authenticatedGuest.getNames() + " " + authenticatedGuest.getSurnames());
            response.put("guestId", authenticatedGuest.getIdGuest()); 
            response.put("role", "GUEST");
            
            return ResponseEntity.ok(response);
        }

        // 2. Validar autenticación como Personal (User / Admin / Recepcionista)
        User authenticatedUser = userService.authenticate(cleanEmail, password);

        if (authenticatedUser != null) {
            session.setAttribute("userId", authenticatedUser.getIdUsuario());
            session.setAttribute("userRole", authenticatedUser.getRol() != null ? authenticatedUser.getRol().getNameRol() : "ADMIN");

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login exitoso como Personal");
            response.put("guestName", authenticatedUser.getNames() + " " + authenticatedUser.getSurnames());
            response.put("userId", authenticatedUser.getIdUsuario());
            response.put("role", authenticatedUser.getRol() != null ? authenticatedUser.getRol().getNameRol() : "ADMIN");
            response.put("redirectUrl", "/admin/dashboard");

            return ResponseEntity.ok(response);
        }

        // Si no coincide en ninguna entidad
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
    }
    
    /**
     * Endpoint POST: /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Guest guest, HttpSession session) {
        try {
            Guest savedGuest = guestService.save(guest);
            session.setAttribute("guestId", savedGuest.getIdGuest());
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registro e inicio de sesión exitoso");
            response.put("guestName", savedGuest.getNames() + " " + savedGuest.getSurnames());
            response.put("guestId", savedGuest.getIdGuest());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al registrar: " + e.getMessage());
        }
    }
    
    /**
     * Endpoint GET: /api/auth/check
     */
    @GetMapping("/check")
    public ResponseEntity<?> checkSession(HttpSession session) {
        Integer guestId = (Integer) session.getAttribute("guestId");
        
        if (guestId != null) {
            Guest guest = guestService.findById(guestId);
            if (guest != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("isLoggedIn", true);
                response.put("role", "GUEST");
                response.put("guestName", guest.getNames() + " " + guest.getSurnames());
                response.put("guestId", guest.getIdGuest());
                return ResponseEntity.ok(response);
            }
        }

        Integer userId = (Integer) session.getAttribute("userId");
        if (userId != null) {
            User user = userService.findById(userId);
            if (user != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("isLoggedIn", true);
                response.put("role", session.getAttribute("userRole"));
                response.put("guestName", user.getNames() + " " + user.getSurnames());
                response.put("userId", user.getIdUsuario());
                response.put("redirectUrl", "/admin/dashboard");
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.ok(Map.of("isLoggedIn", false));
    }

    /**
     * Endpoint POST: /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Sesión cerrada");
    }
}