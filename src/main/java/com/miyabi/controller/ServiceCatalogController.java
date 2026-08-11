package com.miyabi.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.miyabi.models.ServiceCatalog;
import com.miyabi.service.ServiceCatalogService;

/**
 * Controlador REST para el Catálogo de Servicios e Inventario del hotel.
 */
@RestController
@RequestMapping("/api/services-catalog")
public class ServiceCatalogController {

    private final ServiceCatalogService serviceCatalogService;

    public ServiceCatalogController(ServiceCatalogService serviceCatalogService) {
        this.serviceCatalogService = serviceCatalogService;
    }

    @GetMapping
    public List<ServiceCatalog> getAllServices() {
        return serviceCatalogService.findAll();
    }

    @GetMapping("/available")
    public List<ServiceCatalog> getAvailableServices() {
        return serviceCatalogService.findAvailable();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceCatalog> getServiceById(@PathVariable Integer id) {
        ServiceCatalog sc = serviceCatalogService.findById(id);
        if (sc != null) return ResponseEntity.ok(sc);
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ServiceCatalog createService(@RequestBody ServiceCatalog serviceCatalog) {
        return serviceCatalogService.save(serviceCatalog);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateService(@PathVariable Integer id, @RequestBody ServiceCatalog details) {
        ServiceCatalog existing = serviceCatalogService.findById(id);
        if (existing != null) {
            existing.setServiceName(details.getServiceName());
            existing.setDescription(details.getDescription());
            existing.setPrice(details.getPrice());
            existing.setCategory(details.getCategory());
            existing.setSeason(details.getSeason());
            existing.setAvailable(details.getAvailable());
            ServiceCatalog saved = serviceCatalogService.save(existing);
            return ResponseEntity.ok(saved);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(@PathVariable Integer id) {
        try {
            serviceCatalogService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}