package com.miyabi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.miyabi.models.Rol;
import com.miyabi.models.User;
import com.miyabi.models.ServiceCatalog;
import com.miyabi.repository.RolRepository;
import com.miyabi.repository.UserRepository;
import com.miyabi.repository.ServiceCatalogRepository;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RolRepository rolRepository;
    private final ServiceCatalogRepository serviceCatalogRepository;

    public DataInitializer(UserRepository userRepository, RolRepository rolRepository, ServiceCatalogRepository serviceCatalogRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
        this.serviceCatalogRepository = serviceCatalogRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Asegurar roles principales
        Rol adminRole = getOrCreateRol("Administrator", "Acceso total al sistema y finanzas del Ryokan");
        Rol recepRole = getOrCreateRol("Receptionist", "Gestión de check-in, check-out y atención al huésped");
        Rol staffRole = getOrCreateRol("Cuartelero", "Mantenimiento, servicio a la habitación y limpieza");
        Rol clientRole = getOrCreateRol("Client", "Huéspedes registrados en la plataforma");

        // 2. Asegurar personal inicial (Staff)
        createStaffIfAbsent("onur@hotel.com", "Rodrigo", "Dalmagro López", "1234", adminRole);
        createStaffIfAbsent("potter@hotel.com", "Christine", "Chi Miller", "1234", recepRole);
        createStaffIfAbsent("recepcion@hotel.com", "Kenji", "Sato", "1234", recepRole);
        createStaffIfAbsent("limpieza@hotel.com", "Akira", "Kobayashi", "1234", staffRole);
        createStaffIfAbsent("mantenimiento@hotel.com", "Hiroshi", "Tanaka", "1234", staffRole);

        // 3. Asegurar servicios esenciales en el inventario
        createServiceIfAbsent("Té Verde Matcha Ceremonial", "Té verde orgánico preparado al estilo tradicional japonés", new BigDecimal("25.00"), "Bebidas", "All year");
        createServiceIfAbsent("Sake Junmai Daiginjo (750ml)", "Sake artesanal de alta pureza servido frío o tibio", new BigDecimal("120.00"), "Bebidas", "All year");
        createServiceIfAbsent("Masaje Shiatsu Tradicional (60 min)", "Masaje terapéutico equilibrante en futón de tatami", new BigDecimal("180.00"), "Spa", "All year");
        createServiceIfAbsent("Cena Kaiseki 7 Tiempos", "Menú degustación de alta cocina japonesa con productos de temporada", new BigDecimal("350.00"), "Gastronomía", "All year");
        createServiceIfAbsent("Baño Privado Onsen aromático", "Reserva de pozo termal privado con aceites esenciales de Yuzu", new BigDecimal("95.00"), "Spa", "All year");

        System.out.println(">>> DataInitializer: Roles, Personal e Inventario inicializados exitosamente.");
    }

    private Rol getOrCreateRol(String name, String desc) {
        return rolRepository.findAll().stream()
                .filter(r -> name.equalsIgnoreCase(r.getNameRol()))
                .findFirst()
                .orElseGet(() -> {
                    Rol r = new Rol();
                    r.setNameRol(name);
                    r.setDescription(desc);
                    return rolRepository.save(r);
                });
    }

    private void createStaffIfAbsent(String email, String names, String surnames, String password, Rol rol) {
        if (userRepository.findByEmail(email).isEmpty()) {
            User u = new User();
            u.setNames(names);
            u.setSurnames(surnames);
            u.setEmail(email);
            u.setPassword(password);
            u.setState(1);
            u.setRol(rol);
            userRepository.save(u);
        }
    }

    private void createServiceIfAbsent(String name, String desc, BigDecimal price, String cat, String season) {
        boolean exists = serviceCatalogRepository.findAll().stream()
                .anyMatch(s -> s.getServiceName().equalsIgnoreCase(name));
        if (!exists) {
            ServiceCatalog sc = new ServiceCatalog();
            sc.setServiceName(name);
            sc.setDescription(desc);
            sc.setPrice(price);
            sc.setCategory(cat);
            sc.setSeason(season);
            sc.setAvailable(1);
            serviceCatalogRepository.save(sc);
        }
    }
}
