package com.kaestner.domain.employeeversion

import org.springframework.data.jpa.repository.JpaRepository

/**
 * Spring Data JPA repository for `EmployeeVersion` entities.
 *
 * This repository provides standard CRUD operations (inherited from JpaRepository)
 * and a custom finder to obtain the version history for a specific employee.
 * The custom query method returns versions ordered by their creation timestamp
 * in descending order (most recent first) which is useful for history views.
 */
interface EmployeeVersionRepository : JpaRepository<EmployeeVersion, Long> {
    /**
     * Retrieve all versions for the given employee, ordered by `createdAt` descending.
     *
     * @param employeeId id of the employee whose version history should be returned
     * @return list of EmployeeVersion entities ordered from newest to oldest
     */
    fun findByEmployeeIdOrderByCreatedAtDesc(employeeId: Long): List<EmployeeVersion>
}