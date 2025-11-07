package com.kaestner.domain.employee

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data JPA repository for `Employee` entities.
 *
 * Extends `JpaRepository` to provide standard CRUD and paging operations for the
 * `Employee` entity (e.g. save, findById, findAll, deleteById). Add custom query
 * method signatures here when application-specific queries are required.
 *
 * This interface is a Spring-managed bean discovered by component scanning due
 * to the `@Repository` annotation.
 */
@Repository
interface EmployeeRepository : JpaRepository<Employee, Long>