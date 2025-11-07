
package com.kaestner.api

import com.kaestner.api.mapper.EmployeeVersionDtoMapper
import com.kaestner.domain.employeeversion.EmployeeVersion
import com.kaestner.domain.employeeversion.EmployeeVersionService
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import org.example.employeemgmt.dtos.EmployeeVersionDto
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`
import org.springframework.http.HttpStatus

class EmployeeVersionControllerTest {
    private val employeeVersionService: EmployeeVersionService = mock(EmployeeVersionService::class.java)
    private val employeeVersionDtoMapper: EmployeeVersionDtoMapper = mock(EmployeeVersionDtoMapper::class.java)
    private val controller = EmployeeVersionController(employeeVersionService, employeeVersionDtoMapper)

    @Test
    fun retrieveAllVersionsForEmployeeReturnsListOfDtos() {
        val employeeId = 1L
        val versions = listOf(
            EmployeeVersion(1L, employeeId, "John", "Doe", LocalDate.parse("2023-01-01"), "123", "456", LocalDateTime.parse("2025-01-01T10:00:00"), 2),
            EmployeeVersion(2L, employeeId, "John", "Doe", LocalDate.parse("2023-01-01"), "123", "456", LocalDateTime.parse("2025-01-01T10:00:00"), 1)
        )
        val dtos = listOf(
            EmployeeVersionDto("1", "1", "John", "Doe", "2023-01-01", "123", "456", "1", "2023-01-01T10:00:00"),
            EmployeeVersionDto("2", "1", "John", "Doe", "2023-01-01", "123", "456", "2", "2023-01-02T10:00:00")
        )

        `when`(employeeVersionService.findByEmployeeIdOrderByCreatedAtDesc(employeeId)).thenReturn(versions)
        `when`(employeeVersionDtoMapper.mapToDto(versions[0])).thenReturn(dtos[0])
        `when`(employeeVersionDtoMapper.mapToDto(versions[1])).thenReturn(dtos[1])

        val response = controller.getByEmployeeId(employeeId)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(dtos, response.body)
    }

    @Test
    fun retrieveSpecificVersionReturnsDto() {
        val employeeId = 1L
        val version = 2L
        val employeeVersion = EmployeeVersion(2L, employeeId, "John", "Doe", LocalDate.parse("2023-01-01"), "123", "456", LocalDateTime.parse("2023-01-02T10:00:00"), 2)
        val dto = EmployeeVersionDto("2", "1", "John", "Doe", "2023-01-01", "123", "456", "2", "2023-01-02T10:00:00")

        `when`(employeeVersionService.findByVersionForEmployeeId(employeeId, version)).thenReturn(employeeVersion)
        `when`(employeeVersionDtoMapper.mapToDto(employeeVersion)).thenReturn(dto)

        val response = controller.getForEmployeeByVersion(employeeId, version)

        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(dto, response.body)
    }

    @Test
    fun retrieveSpecificVersionReturnsNotFoundForNonExistentVersion() {
        val employeeId = 1L
        val version = 99L

        `when`(employeeVersionService.findByVersionForEmployeeId(employeeId, version)).thenThrow(NoSuchElementException::class.java)

        val response = controller.getForEmployeeByVersion(employeeId, version)

        assertEquals(HttpStatus.NOT_FOUND, response.statusCode)
        assertTrue(response.body == null)
    }
}