package com.kaestner.domain.employee

/**
 * Exception indicating that an update operation failed due to a stale/optimistic locking
 * situation (concurrent modification).
 *
 * Throw this exception when an entity could not be updated because its version or
 * state was changed by another transaction. The optional message should include
 * contextual information (for example the employee id) to help with diagnostics.
 *
 * This is an unchecked exception (extends [RuntimeException]) so it can propagate
 * through service layers and be handled by higher-level exception handlers (e.g. a
 * @ControllerAdvice in web applications).
 *
 * Example message: "Employee with id=1 could not be updated due to concurrent modification"
 */
class StaleEmployeeException(message: String) : RuntimeException(message)
