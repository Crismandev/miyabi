package com.miyabi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.miyabi.models.AccessLog;

/**
 * Interfaz de Repositorio para la entidad AccessLog.
 * Al extender de JpaRepository, Spring Data JPA genera automáticamente 
 * toda la implementación necesaria para interactuar con SQL Server.
 * * Beneficio técnico: No necesitamos escribir consultas SQL manuales (SELECT, INSERT, UPDATE) 
 * para las operaciones básicas, lo que reduce el error humano y acelera el desarrollo.
 */
public interface AccessLogRepository extends JpaRepository<AccessLog, Integer> {
    
    /**
     * Obtiene los últimos 10 registros de acceso ordenados descendentemente por ID.
     */
    java.util.List<AccessLog> findTop10ByOrderByIdAccessDesc();

    /**
     * Obtiene todos los registros de acceso ordenados descendentemente por ID.
     */
    java.util.List<AccessLog> findAllByOrderByIdAccessDesc();

    /**
     * Elimina todos los registros de acceso pertenecientes a un usuario.
     */
    void deleteByUser_IdUsuario(Integer idUsuario);
}