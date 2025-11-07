package org.example.employeemgmt.dtos

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@Serializable
@JsExport
data class EmployeeDeletionResponseDto(
    val deletedEmployeeIds: List<String>,
    val failedEmployeeIds: List<String>
)
