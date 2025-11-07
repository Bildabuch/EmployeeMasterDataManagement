package org.example.employeemgmt.dtos

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@Serializable
@JsExport
data class EmployeeDto(
    val id: String?,
    val givenName: String,
    val surname: String,
    val birthDate: String,
    val pensionInsuranceNumber: String,
    val taxIdentificationNumber: String,
    val version: String?,
    val updatedAt: String?
)