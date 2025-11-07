package org.example.employeemgmt

import kotlinx.datetime.Clock
import kotlinx.datetime.LocalDate
import kotlinx.datetime.TimeZone
import kotlinx.datetime.toLocalDateTime
import org.example.employeemgmt.dtos.EmployeeDto

@OptIn(ExperimentalJsExport::class)
@JsExport
object EmployeeValidatorService {
    fun validate(employee: EmployeeDto): dynamic {
        val map = EmployeeValidator.validate(
            Employee(
                givenName = employee.givenName,
                surname = employee.surname,
                birthDate = LocalDate.parse(employee.birthDate),
                pensionInsuranceNumber = employee.pensionInsuranceNumber,
                taxIdentificationNumber = employee.taxIdentificationNumber,
                updatedAt = Clock.System.now().toLocalDateTime(TimeZone.UTC)
            )
        )
        val obj: dynamic = js("{}")
        map.forEach { (k, v) -> obj[k] = v }
        return js("new Map(Object.entries(obj))")
    }
}