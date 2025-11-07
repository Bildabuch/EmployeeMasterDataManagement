package com.kaestner.domain.employeeversion

import jakarta.persistence.*
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime

/**
 * Historical snapshot of an Employee at a specific point in time.
 *
 * Each update of an Employee can create an EmployeeVersion to preserve the
 * previous state. This entity is intended for audit/history purposes and
 * contains a compact copy of the employee's data together with the creation
 * timestamp and the source entity version at the time of snapshot creation.
 *
 * The table is indexed on `employee_id` to allow efficient lookups for a
 * given employee's history.
 *
 * @property id primary key (database-generated)
 * @property employeeId id of the original Employee this version belongs to
 * @property givenName employee given name at the time of the snapshot
 * @property surname employee surname at the time of the snapshot
 * @property birthDate employee birthdate (unchanged by updates, kept here for completeness)
 * @property pensionInsuranceNumber pension insurance number at the time of the snapshot
 * @property taxIdentificationNumber tax id at the time of the snapshot
 * @property createdAt timestamp when the snapshot was created (defaults to current system time)
 * @property version optimistic version value copied from the source entity for traceability
 */
@Entity
@Table(indexes = [Index(name = "idx_employee_version_employee_id", columnList = "employee_id")])
data class EmployeeVersion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @Column(name = "employee_id", nullable = false)
    val employeeId: Long,
    val givenName: String,
    val surname: String,
    val birthDate: LocalDate,
    val pensionInsuranceNumber: String,
    val taxIdentificationNumber: String,
    val createdAt: LocalDateTime,
    val version: Long = 0
)
