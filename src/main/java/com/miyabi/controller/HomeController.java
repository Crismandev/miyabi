package com.miyabi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.miyabi.service.RoomTypeService;

/**
 * Controlador MVC principal (Navegación Pública).
 * Se encarga de gestionar el enrutamiento de las páginas públicas del sitio web.
 */
@Controller 
public class HomeController {
	
	private final RoomTypeService roomTypeService;
	
	public HomeController(RoomTypeService roomTypeService) {
        this.roomTypeService = roomTypeService;
    }

    /**
     * Endpoint GET: /
     * Ruta raíz. Carga la página principal (Home) del hotel.
     */
    @GetMapping("/")
    public String index() {
        return "pages/Index"; 
    }

    /**
     * Endpoint GET: /facilities
     * Carga la página informativa sobre las instalaciones del hotel.
     */
    @GetMapping("/facilities")
    public String facilities() {
        return "pages/Facilities"; 
    }

    /**
     * Endpoint GET: /cuisine
     * Carga la página dedicada a la experiencia gastronómica Kaiseki Horin.
     */
    @GetMapping("/cuisine")
    public String cuisine() {
        return "pages/Cuisine"; 
    }
    
    /**
     * Endpoint GET: /spa
     * Carga la página del Spa Entei.
     */
    @GetMapping("/spa")
    public String spa() {
        return "pages/Spa";
    }

    /**
     * Endpoint GET: /amenities
     * Carga la página de Amenidades de Yakushiyama.
     */
    @GetMapping("/amenities")
    public String amenities() {
        return "pages/Amenities";
    }

    /**
     * Endpoint GET: /experiences
     * Carga la página de Experiencias Privadas Únicas.
     */
    @GetMapping("/experiences")
    public String experiences() {
        return "pages/Experiences";
    }

    /**
     * Endpoint GET: /stay-offers
     * Carga la página de Ofertas de Estancia & Paquetes.
     */
    @GetMapping("/stayOffers")
    public String stayOffersOld() {
        return "pages/StayOffers";
    }

    @GetMapping("/stay-offers")
    public String stayOffers() {
        return "pages/StayOffers";
    }

    /**
     * Endpoint GET: /location
     * Carga la página de Acceso & Ubicación.
     */
    @GetMapping("/location")
    public String location() {
        return "pages/Location";
    }

    /**
     * Endpoint GET: /rooms
     * Carga el catálogo público de habitaciones.
     */
    @GetMapping("/rooms")
    public String rooms(Model model) {
        model.addAttribute("roomTypes", roomTypeService.findAll());
        return "pages/Rooms"; 
    }
    
    /**
     * Endpoint GET: /reservation
     */
    @GetMapping("/reservation")
    public String reservation() {
        return "pages/Reservation"; 
    }
    
    /**
     * Endpoint GET: /register
     */
    @GetMapping("/register")
    public String showRegisterPage() {
        return "pages/Register"; 
    }
    
    /**
     * Endpoint GET: /profile
     */
    @GetMapping("/profile")
    public String showProfilePage() {
        return "pages/Profile"; 
    }
}