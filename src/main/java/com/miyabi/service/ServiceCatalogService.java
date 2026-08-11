package com.miyabi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.miyabi.models.ServiceCatalog;
import com.miyabi.repository.ServiceCatalogRepository;

/**
 * Servicio encargado de gestionar el catálogo de servicios e inventario.
 */
@Service
public class ServiceCatalogService {

    private final ServiceCatalogRepository serviceCatalogRepository;

    public ServiceCatalogService(ServiceCatalogRepository serviceCatalogRepository) {
        this.serviceCatalogRepository = serviceCatalogRepository;
    }

    public List<ServiceCatalog> findAll() {
        return serviceCatalogRepository.findAll();
    }

    public List<ServiceCatalog> findAvailable() {
        return serviceCatalogRepository.findByAvailable(1);
    }

    public ServiceCatalog findById(Integer id) {
        return serviceCatalogRepository.findById(id).orElse(null);
    }

    public ServiceCatalog save(ServiceCatalog serviceCatalog) {
        return serviceCatalogRepository.save(serviceCatalog);
    }

    @Transactional
    public void deleteById(Integer id) {
        if (id == null) return;
        ServiceCatalog sc = findById(id);
        if (sc != null) {
            try {
                serviceCatalogRepository.deleteById(id);
            } catch (Exception e) {
                sc.setAvailable(0);
                serviceCatalogRepository.save(sc);
            }
        }
    }
}