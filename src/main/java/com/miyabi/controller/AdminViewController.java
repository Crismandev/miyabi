package com.miyabi.controller;

import java.math.BigDecimal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.miyabi.service.RoomService;
import com.miyabi.service.UserService;
import com.miyabi.service.RoomTypeService;
import com.miyabi.service.ServiceCatalogService;
import com.miyabi.service.AccessLogService;
import com.miyabi.repository.ReservationRepository; 

/**
 * Controlador MVC para el panel de administración (Admin Panel).
 */
@Controller
@RequestMapping("/admin")
public class AdminViewController {

    private final RoomService roomService;
    private final UserService userService;
    private final RoomTypeService roomTypeService;
    private final ServiceCatalogService serviceCatalogService;
    private final AccessLogService accessLogService;
    private final ReservationRepository reservationRepository; 

    public AdminViewController(RoomService roomService, 
                               UserService userService, 
                               RoomTypeService roomTypeService,
                               ServiceCatalogService serviceCatalogService,
                               AccessLogService accessLogService,
                               ReservationRepository reservationRepository) {
        this.roomService = roomService;
        this.userService = userService;
        this.roomTypeService = roomTypeService;
        this.serviceCatalogService = serviceCatalogService;
        this.accessLogService = accessLogService;
        this.reservationRepository = reservationRepository;
    }

    @GetMapping("/rooms")
    public String viewRooms(Model model) {
        model.addAttribute("listRooms", roomService.findAll());
        model.addAttribute("roomTypes", roomTypeService.findAll());
        return "admin/rooms";
    }
    
    @GetMapping("/room-types")
    public String viewRoomTypes(Model model) {
        model.addAttribute("listTypes", roomTypeService.findAll());
        return "admin/room-types"; 
    }

    @GetMapping("/reservations")
    public String viewReservations(Model model) {
        model.addAttribute("listReservations", reservationRepository.findAll());
        return "admin/reservations";
    }

    @GetMapping("/inventory")
    public String viewInventory(Model model) {
        model.addAttribute("listServices", serviceCatalogService.findAll());
        return "admin/inventory";
    }

    @GetMapping("/users")
    public String viewUsers(Model model) {
        model.addAttribute("listUsers", userService.findAll());
        return "admin/users"; 
    }

    @GetMapping("/movements")
    public String viewMovements(Model model) {
        model.addAttribute("listLogs", accessLogService.findAll());
        return "admin/movements";
    }
    
    @GetMapping("/dashboard")
    public String viewDashboard(Model model) {
        BigDecimal totalRevenue = reservationRepository.sumTotalRevenue();
        model.addAttribute("totalRevenue", totalRevenue != null ? totalRevenue : 0);
        
        model.addAttribute("pendingCount", reservationRepository.countByState("Pending"));
        model.addAttribute("activeCount", reservationRepository.countByState("Confirmed"));
        model.addAttribute("totalRooms", roomService.findAll().size());
        
        model.addAttribute("recentLogs", accessLogService.findRecentLogs());
        model.addAttribute("recentReservations", reservationRepository.findTop5ByOrderByReservationIdDesc());
        
        return "admin/dashboard"; 
    }
}