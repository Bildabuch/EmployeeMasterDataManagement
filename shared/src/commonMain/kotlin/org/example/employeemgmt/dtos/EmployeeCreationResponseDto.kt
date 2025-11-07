package org.example.employeemgmt.dtos

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@Serializable
@JsExport
data class EmployeeCreationResponseDto(
    val createdEmployeeId: String?,
    val errorMessages: Map<String, String>?
)
