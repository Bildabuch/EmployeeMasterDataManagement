package com.kaestner.api

import com.kaestner.api.mapper.EmployeeVersionDtoMapper
import com.kaestner.domain.employeeversion.EmployeeVersionService
import org.example.employeemgmt.dtos.EmployeeVersionDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * REST controller for managing employee versions.
 *
 * Provides endpoints for retrieving an employee's version history
 * or obtaining a specific version of employee data.
 * The base path for this controller is "/employee-versions".
 */
@RestController
@RequestMapping("/employee-versions")
@CrossOrigin(origins = ["http://localhost:4200"])
class EmployeeVersionController(
    private val employeeVersionService: EmployeeVersionService,
    private val employeeVersionDtoMapper: EmployeeVersionDtoMapper
) {

    /**
     * Retrieves all versions of an employee's data, sorted by creation date in descending order.
     * GET /employee-versions/{employeeId}
     *
     * @param employeeId The ID of the employee whose version history is to be retrieved.
     * @return HTTP 200 with a list of [EmployeeVersionDto] objects representing the version history.
     **/
    @GetMapping("/{employeeId}")
    fun getByEmployeeId(@PathVariable employeeId: Long): ResponseEntity<List<EmployeeVersionDto>> {
        employeeVersionService.findByEmployeeIdOrderByCreatedAtDesc(employeeId)
            .map { employeeVersionDtoMapper.mapToDto(it) }
            .let { return ResponseEntity.ok(it) }

    }

    /**
     * Retrieves a specific version of an employee's data.
     *
     * GET /employee-versions/{employeeId}/{version}
     *
     * @param employeeId The employee's ID.
     * @param version The version number of the employee data to be retrieved.
     * @return HTTP 200 with the [EmployeeVersionDto] representing the requested version,
     *          or HTTP 404 if the version was not found.
     */
    @GetMapping("/{employeeId}/{version}")
    fun getForEmployeeByVersion(
        @PathVariable employeeId: Long,
        @PathVariable version: Long
    ): ResponseEntity<EmployeeVersionDto> {
        try {
            employeeVersionService.findByVersionForEmployeeId(employeeId, version).let {
                return ResponseEntity.ok(employeeVersionDtoMapper.mapToDto(it))
            }
        } catch (_: NoSuchElementException) {
            return ResponseEntity.notFound().build()
        }
    }

}