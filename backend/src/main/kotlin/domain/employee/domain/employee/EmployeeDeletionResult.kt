package com.kaestner.domain.employee.domain.employee

/**
 * Result object returned by employee deletion operations.
 *
 * This data class contains the list of successfully deleted employee IDs and
 * the list of IDs for which deletion failed. It is meant to summarize the outcome
 * of a batch deletion operation.
 *
 * @property deletedEmployeeIds list of IDs that were deleted successfully
 * @property failedEmployeeIds list of IDs for which deletion failed
 */
data class EmployeeDeletionResult(
    val deletedEmployeeIds: List<Long>,
    val failedEmployeeIds: List<Long>
) {
    /**
     * Indicates whether the deletion operation is considered successful.
     *
     * The operation is treated as successful when there are no failed IDs.
     * A successful result may still contain zero deleted IDs (e.g. nothing to delete),
     * but it will return true only when the `failedEmployeeIds` list is empty.
     *
     * @return true if no deletions failed, false otherwise
     */
    fun isSuccess(): Boolean {
        return failedEmployeeIds.isEmpty()
    }
}