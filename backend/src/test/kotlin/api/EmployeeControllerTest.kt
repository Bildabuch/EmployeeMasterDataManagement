package com.kaestner.api

import com.kaestner.api.mapper.EmployeeCreationResponseDtoMapper
import com.kaestner.api.mapper.EmployeeDeletionResponseDtoMapper
import com.kaestner.api.mapper.EmployeeDtoMapper
import com.kaestner.api.mapper.EmployeeUpdateResponseDtoMapper
import com.kaestner.domain.employee.Employee
import com.kaestner.domain.employee.EmployeeService
import com.kaestner.domain.employee.EmployeeUpdateResult
import com.kaestner.domain.employee.domain.employee.EmployeeCreationResult
import kotlinx.datetime.LocalDate
import org.example.employeemgmt.dtos.EmployeeCreationResponseDto
import org.example.employeemgmt.dtos.EmployeeDeletionResponseDto
import org.example.employeemgmt.dtos.EmployeeDto
import org.example.employeemgmt.dtos.EmployeeUpdateResponseDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`
import org.springframework.http.HttpStatus

class EmployeeControllerTest {

    private val employeeService: EmployeeService = mock(EmployeeService::class.java)
    private val employeeDtoMapper: EmployeeDtoMapper = mock(EmployeeDtoMapper::class.java)
    private val employeeCreationResponseDtoMapper: EmployeeCreationResponseDtoMapper =
        mock(EmployeeCreationResponseDtoMapper::class.java)
    private val employeeUpdateResponseDtoMapper: EmployeeUpdateResponseDtoMapper =
        mock(EmployeeUpdateResponseDtoMapper::class.java)
    private val employeeDeletionResponseDtoMapper: EmployeeDeletionResponseDtoMapper =
        mock(EmployeeDeletionResponseDtoMapper::class.java)
    private val controller = EmployeeController(
        employeeService,
        employeeDtoMapper,
        employeeCreationResponseDtoMapper,
        employeeUpdateResponseDtoMapper,
        employeeDeletionResponseDtoMapper
    )

    @Test
    fun retrieveAllEmployeesReturnsListOfDtos() {
        val employees = listOf(
            Employee(
                1L,
                "John",
                "Doe",
                LocalDate.parse("1990-01-01"),
                "123456789A",
                "9876543210"
            ),
            Employee(
                2L,
                "Jane",
                "Smith",
                LocalDate.parse("1985-05-15"),
                "A987654321",
                "0123456789"
            )
        )
        val dtos = listOf(
            EmployeeDto(
                "1",
                "John",
                "Doe",
                "1990-01-01",
                "123456789A",
                "9876543210",
                "0",
                "2024-01-01T00:00:00"
            ),
            EmployeeDto(
                "2",
                "Jane",
                "Smith",
                "1985-05-15",
                "A987654321",
                "0123456789",
                "0",
                "2024-01-01T00:00:00"
            )
        )

        `when`(employeeService.findAll()).thenReturn(employees)
        `when`(employeeDtoMapper.mapToDto(employees[0])).thenReturn(dtos[0])
        `when`(employeeDtoMapper.mapToDto(employees[1])).thenReturn(dtos[1])

        val result = controller.getAll()

        assertEquals(dtos, result)
    }

    @Test
    fun retrieveEmployeeByIdReturnsDtoIfFound() {
        val employee = Employee(1L, "John", "Doe", LocalDate.parse("1990-01-01"), "123456789A", "9876543210")
        val dto = EmployeeDto("1", "John", "Doe", "1990-01-01", "123456789A", "9876543210", "0", "2024-01-01T00:00:00")

        `when`(employeeService.findById(1L)).thenReturn(employee)
        `when`(employeeDtoMapper.mapToDto(employee)).thenReturn(dto)

        val response = controller.getById(1L)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(dto, response.body)
    }

    @Test
    fun retrieveEmployeeByIdReturnsNotFoundIfNotExists() {
        `when`(employeeService.findById(1L)).thenReturn(null)

        val response = controller.getById(1L)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertNull(response.body)
    }

    @Test
    fun createEmployeeReturnsCreatedDtoOnSuccess() {
        val employeeDto = EmployeeDto("0", "John", "Doe", "1990-01-01", "123456789A", "9876543210", null, null)
        val employee = Employee(1L, "John", "Doe", LocalDate.parse("1990-01-01"), "123456789A", "9876543210")
        val creationResponse = EmployeeCreationResponseDto("1", emptyMap())
        val employeeCreationResult = EmployeeCreationResult(employee, emptyMap())

        `when`(employeeDtoMapper.mapToEntity(employeeDto)).thenReturn(employee)
        `when`(employeeService.create(employee)).thenReturn(employeeCreationResult)
        `when`(employeeCreationResponseDtoMapper.mapToDto(employeeCreationResult)).thenReturn(creationResponse)

        val response = controller.create(employeeDto)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(creationResponse, response.body)
    }

    @Test
    fun createEmployeeReturnsBadRequestOnFailure() {
        val employeeDto = EmployeeDto("0", "John", "Doe", "1990-01-01", "123456789A", "9876543210", null, null)

        `when`(employeeDtoMapper.mapToEntity(employeeDto)).thenThrow(RuntimeException::class.java)

        val response = controller.create(employeeDto)

        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
    }

    @Test
    fun updateEmployeeReturnsUpdatedDtoOnSuccess() {
        val employeeDto = EmployeeDto("1", "John", "Doe", "1990-01-01", "123456789A", "9876543210", null, null)
        val employee = Employee(1L, "John", "Doe", LocalDate.parse("1990-01-01"), "123456789A", "9876543210")
        val updateResponse = EmployeeUpdateResponseDto("1", emptyMap())
        val employeeUpdateResult = EmployeeUpdateResult(employee, emptyMap())

        `when`(employeeDtoMapper.mapToEntity(employeeDto)).thenReturn(employee)
        `when`(employeeService.update(employee)).thenReturn(employeeUpdateResult)
        `when`(employeeUpdateResponseDtoMapper.mapToDto(employeeUpdateResult)).thenReturn(updateResponse)

        val response = controller.update(1L, employeeDto)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(updateResponse, response.body)
    }

    @Test
    fun updateEmployeeReturnsNotFoundIfEmployeeDoesNotExist() {
        val employeeDto = EmployeeDto("1", "John", "Doe", "1990-01-01", "123456789A", "9876543210", null, null)

        `when`(employeeDtoMapper.mapToEntity(employeeDto)).thenThrow(NoSuchElementException::class.java)

        val response = controller.update(1L, employeeDto)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
    }

    @Test
    fun deleteEmployeeReturnsDeletionDtoOnSuccess() {
        val deletionResponse = EmployeeDeletionResponseDto(listOf("1"), emptyList())
val deletionResult = com.kaestner.domain.employee.domain.employee.EmployeeDeletionResult(
            deletedEmployeeIds = listOf(1L),
            failedEmployeeIds = emptyList()
        )
        `when`(employeeService.delete(1L)).thenReturn(deletionResult)
        `when`(employeeDeletionResponseDtoMapper.mapToDto(deletionResult)).thenReturn(deletionResponse)

        val response = controller.delete(1L)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(deletionResponse, response.body)
    }

    @Test
    fun deleteEmployeeReturnsBadRequestOnFailure() {
        `when`(employeeService.delete(1L)).thenThrow(RuntimeException::class.java)

        val response = controller.delete(1L)

        assertEquals(HttpStatus.BAD_REQUEST, response.statusCode)
    }
}