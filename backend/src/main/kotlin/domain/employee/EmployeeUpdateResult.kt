package com.kaestner.domain.employee

/**
 * Result object returned by employee update operations.
 *
 * Contains the updated [Employee] when the update was successful and a map of
 * error messages when the update failed. The map keys are error identifiers and
 * the values are human-readable messages (typically localized by the caller).
 *
 * @property employee the updated Employee instance, or null when the update failed
 * @property errorMessages optional map of error keys to messages describing why the update failed
 */
data class EmployeeUpdateResult(
    val employee: Employee?,
    val errorMessages: Map<String, String>?
)
{
    /**
     * Returns true when the update succeeded: an employee is present and there are no errors.
     *
     * @return true if the update succeeded, false otherwise
     */
    fun isSuccess(): Boolean {
        return employee != null && (errorMessages == null || errorMessages.isEmpty())
    }
}