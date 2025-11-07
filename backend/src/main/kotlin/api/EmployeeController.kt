package com.kaestner.api

import com.kaestner.api.mapper.EmployeeCreationResponseDtoMapper
import com.kaestner.api.mapper.EmployeeDeletionResponseDtoMapper
import com.kaestner.api.mapper.EmployeeDtoMapper
import com.kaestner.api.mapper.EmployeeUpdateResponseDtoMapper
import com.kaestner.domain.employee.EmployeeService
import com.kaestner.domain.employee.StaleEmployeeException
import org.example.employeemgmt.dtos.EmployeeCreationResponseDto
import org.example.employeemgmt.dtos.EmployeeDeletionResponseDto
import org.example.employeemgmt.dtos.EmployeeDto
import org.example.employeemgmt.dtos.EmployeeUpdateResponseDto
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

/**
 * REST controller that exposes HTTP endpoints for employee management.
 *
 * Exposes basic CRUD operations and batch deletion under the base path "/employees".
 * The controller delegates business logic to [EmployeeService] and maps domain
 * entities to DTOs using mapper classes.
 *
 * Note: The controller currently returns basic ResponseEntity objects and maps
 * exceptions to 400/404 statuses in a simple way. Consider improving error
 * handling with a @ControllerAdvice for consistent error payloads.
 */
@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = ["http://localhost:4200"])
class EmployeeController(
    private val employeeService: EmployeeService,
    private val employeeDtoMapper: EmployeeDtoMapper,
    private val employeeCreationResponseDtoMapper: EmployeeCreationResponseDtoMapper,
    private val employeeUpdateResponseDtoMapper: EmployeeUpdateResponseDtoMapper,
    private val employeeDeletionResponseDtoMapper: EmployeeDeletionResponseDtoMapper
) {
    /**
     * Retrieve all employees.
     *
     * GET /employees/
     *
     * @return a list of [EmployeeDto] representing all employees.
     *         Responds with HTTP 200 and the list (possibly empty).
     */
    @GetMapping("/")
    fun getAll(): List<EmployeeDto> = employeeService.findAll().map { employeeDtoMapper.mapToDto(it) }

    /**
     * Retrieve a single employee by its numeric ID.
     *
     * GET /employees/{id}
     *
     * @param id the numeric identifier of the employee to fetch.
     * @return HTTP 200 with the [EmployeeDto] if found; HTTP 404 if no employee exists with the given id.
     */
    @GetMapping("/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<EmployeeDto> {
        val employee = employeeService.findById(id) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(employeeDtoMapper.mapToDto(employee))
    }

    /**
     * Create a new employee.
     *
     * POST /employees/
     *
     * The request body should contain an [EmployeeDto] describing the new employee.
     *
     * @param employeeDto the DTO representation of the employee to create.
     * @return HTTP 200 with the created resource mapped to [EmployeeCreationResponseDto] on success.
     *         Returns HTTP 400 for invalid input or if creation fails.
     */
    @PostMapping("/")
    fun create(@RequestBody employeeDto: EmployeeDto): ResponseEntity<EmployeeCreationResponseDto> {
        try {
            val employee = employeeDtoMapper.mapToEntity(employeeDto)
            val creationResult = employeeService.create(employee)
            return ResponseEntity.ok(employeeCreationResponseDtoMapper.mapToDto(creationResult))
        } catch (_: Exception) {
            return ResponseEntity.badRequest().build()
        }
    }

    /**
     * Update an existing employee identified by the path id.
     *
     * PUT /employees/{id}
     *
     * The request body contains updated fields in an [EmployeeDto]. Note that the path id
     * is used as the authoritative identifier for the resource being updated.
     *
     * @param id the numeric id of the employee to update.
     * @param employeeDto DTO with updated fields for the employee.
     * @return HTTP 200 with [EmployeeUpdateResponseDto] on success;
     *         HTTP 404 if the employee does not exist; HTTP 400 for other errors.
     */
    @PutMapping("/{id}")
    fun update(
        @PathVariable id: Long,
        @RequestBody employeeDto: EmployeeDto
    ): ResponseEntity<EmployeeUpdateResponseDto> {
        try {
            val employee = employeeDtoMapper.mapToEntity(employeeDto.copy(id = id.toString()))
            val updateResult = employeeService.update(employee)
            return ResponseEntity.ok(employeeUpdateResponseDtoMapper.mapToDto(updateResult))
        } catch (_: NoSuchElementException) {
            return ResponseEntity.notFound().build()
        } catch (_: StaleEmployeeException) {
            return ResponseEntity.status(409).build()
        } catch (_: Exception) {
            return ResponseEntity.badRequest().build()
        }
    }

    /**
     * Delete multiple employees by their IDs.
     *
     * POST /employees/delete-multiple
     *
     * Expects a JSON array of numeric IDs in the request body:
     *   [1, 2, 3]
     *
     * @param ids list of employee ids to delete.
     * @return HTTP 200 with [EmployeeDeletionResponseDto] summarizing deleted resources on success,
     *         or HTTP 400 on failure.
     */
    @PostMapping("/delete-multiple")
    fun deleteMultiple(@RequestBody ids: List<Long>): ResponseEntity<EmployeeDeletionResponseDto> {
        try {
            val deletionResult = employeeService.deleteAll(ids)
            return ResponseEntity.ok(employeeDeletionResponseDtoMapper.mapToDto(deletionResult))
        } catch (_: Exception) {
            return ResponseEntity.badRequest().build()
        }
    }

    /**
     * Delete a single employee by id.
     *
     * DELETE /employees/{id}
     *
     * @param id the numeric id of the employee to delete.
     * @return HTTP 200 with [EmployeeDeletionResponseDto] on success, or HTTP 400 on failure.
     */
    @DeleteMapping("/{id}")
    fun delete(@PathVariable id: Long): ResponseEntity<EmployeeDeletionResponseDto> {
        try {
            val deletionResult = employeeService.delete(id)
            return ResponseEntity.ok(employeeDeletionResponseDtoMapper.mapToDto(deletionResult))
        } catch (_: Exception) {
            return ResponseEntity.badRequest().build()
        }
    }
}