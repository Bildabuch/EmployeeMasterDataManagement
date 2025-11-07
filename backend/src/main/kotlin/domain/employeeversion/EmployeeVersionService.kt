package com.kaestner.domain.employeeversion

import org.springframework.stereotype.Service

/**
 * Service that provides read operations for employee version history.
 *
 * This stateless Spring service delegates to [EmployeeVersionRepository] to load
 * historical snapshots (EmployeeVersion) of employees. It offers convenience
 * methods to retrieve a full history for an employee as well as to fetch a
 * specific version by its version number.
 */
@Service
class EmployeeVersionService(
    val employeeVersionRepository: EmployeeVersionRepository
) {
    /**
     * Return all versions for the given employee ordered by creation timestamp
     * in descending order (most recent first).
     *
     * @param employeeId id of the employee whose version history is requested
     * @return list of EmployeeVersion entries ordered from newest to oldest
     */
    fun findByEmployeeIdOrderByCreatedAtDesc(employeeId: Long) =
        employeeVersionRepository.findByEmployeeIdOrderByCreatedAtDesc(employeeId)

    /**
     * Return a single EmployeeVersion for the given employee and version number.
     *
     * The method searches through the ordered history and returns the first
     * entry that matches the requested version. If no such entry is found the
     * method throws [NoSuchElementException] describing the requested employeeId
     * and version.
     *
     * @param employeeId id of the employee
     * @param version version number to look for
     * @throws NoSuchElementException when the requested version does not exist
     * @return the matching EmployeeVersion
     */
    fun findByVersionForEmployeeId(employeeId: Long, version: Long) =
        employeeVersionRepository.findByEmployeeIdOrderByCreatedAtDesc(employeeId)
            .firstOrNull { it.version == version }
            ?: throw NoSuchElementException("Employee version with employeeId=$employeeId and version=$version not found")

}