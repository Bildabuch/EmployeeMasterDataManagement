package com.kaestner.domain.employee.domain.employee

import com.kaestner.domain.employee.Employee

/**
 * Result object returned by employee creation operations.
 *
 * Contains the created [Employee] when creation was successful and a map of
 * error messages when creation failed. The map keys are error identifiers
 * and the values are human-readable messages (typically localized by the caller).
 *
 * @property employee the created Employee instance, or null when creation failed
 * @property errorMessages optional map of error keys to messages describing why creation failed
 */
data class EmployeeCreationResult(
    val employee: Employee?,
    val errorMessages: Map<String, String>?
)
{
    /**
     * Returns true when the creation succeeded: an employee is present and there are no errors.
     */
    fun isSuccess(): Boolean {
        return employee != null && (errorMessages == null || errorMessages.isEmpty())
    }
}