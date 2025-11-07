package org.example.employeemgmt.dtos

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@Serializable
@JsExport
data class EmployeeUpdateResponseDto(
    val updatedEmployeeId: String?,
    val errorMessages: Map<String, String>?
)
