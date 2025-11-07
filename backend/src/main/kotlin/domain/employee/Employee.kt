package com.kaestner.domain.employee

import jakarta.persistence.*
import kotlinx.datetime.*
import org.example.employeemgmt.IEmployee

/**
 * JPA entity representing an employee in the system.
 *
 * This entity is persisted by JPA and participates in optimistic locking via the
 * [version] field. The entity listener [EmployeeEntityListener] is registered to
 * perform actions (such as creating a historical version) when the entity is updated.
 *
 * The [updatedAt] field holds the last modification timestamp and is initialized
 * with the current system time. It is also refreshed automatically before each
 * update by the [touchUpdatedAt] callback.
 *
 * @property id database-generated primary key (nullable for transient/new entities)
 * @property givenName employee's given name
 * @property surname employee's family name
 * @property birthDate employee's birthdate (kotlinx.datetime.LocalDate)
 * @property pensionInsuranceNumber employee's social/pension insurance number
 * @property taxIdentificationNumber employee's tax identification number
 * @property version optimistic locking version column managed by JPA
 * @property updatedAt last modification timestamp (kotlinx.datetime.LocalDateTime)
 */
@Entity
@EntityListeners(EmployeeEntityListener::class)
data class Employee(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long?,
    override val givenName: String,
    override val surname: String,
    override val birthDate: LocalDate,
    override val pensionInsuranceNumber: String,
    override val taxIdentificationNumber: String,

    @Version
    val version: Long? = 0,

    override var updatedAt: LocalDateTime = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
) : IEmployee {

    /**
     * JPA lifecycle callback invoked before the entity is updated.
     *
     * This method updates the [updatedAt] timestamp to the current system time so
     * that the entity always reflects the last modification moment. It is annotated
     * with [@PreUpdate] and will be executed by the persistence provider automatically
     * prior to issuing the UPDATE statement.
     */
    @PreUpdate
    fun touchUpdatedAt() {
        this.updatedAt = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
    }
}
