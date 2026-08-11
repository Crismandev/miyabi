package com.miyabi.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.miyabi.models.Rol;
import com.miyabi.models.User;
import com.miyabi.repository.RolRepository;
import com.miyabi.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RolRepository rolRepository;

    public DataInitializer(UserRepository userRepository, RolRepository rolRepository) {
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Asegurar que existan los roles básicos
        Rol adminRole = rolRepository.findAll().stream()
                .filter(r -> "Administrator".equalsIgnoreCase(r.getNameRol()) || "ADMIN".equalsIgnoreCase(r.getNameRol()))
                .findFirst()
                .orElseGet(() -> {
                    Rol r = new Rol();
                    r.setNameRol("Administrator");
                    r.setDescription("Acceso total al sistema, gestión de habitaciones y usuarios");
                    return rolRepository.save(r);
                });

        // Asegurar que el usuario Administrador onur@hotel.com esté creado
        if (userRepository.findByEmail("onur@hotel.com").isEmpty()) {
            User adminUser = new User();
            adminUser.setNames("Rodrigo");
            adminUser.setSurnames("Dalmagro López");
            adminUser.setEmail("onur@hotel.com");
            adminUser.setPassword("1234");
            adminUser.setState(1);
            adminUser.setRol(adminRole);
            userRepository.save(adminUser);
            System.out.println(">>> DataInitializer: Administrador 'onur@hotel.com' creado exitosamente.");
        }
    }
}
