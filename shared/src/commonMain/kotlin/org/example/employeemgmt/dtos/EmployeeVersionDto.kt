package org.example.employeemgmt.dtos

import kotlinx.serialization.Serializable
import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@Serializable
@JsExport
data class EmployeeVersionDto(
    val id: String,
    val employeeId: String,
    val givenName: String,
    val surname: String,
    val birthDate: String,
    val pensionInsuranceNumber: String,
    val taxIdentificationNumber: String,
    val version: String,
    val changedAt: String,
)