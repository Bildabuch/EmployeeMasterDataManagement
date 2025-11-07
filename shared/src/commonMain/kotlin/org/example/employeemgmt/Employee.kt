package org.example.employeemgmt

import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime

class Employee(
    override val givenName: String,
    override val surname: String,
    override val birthDate: LocalDate,
    override val pensionInsuranceNumber: String,
    override val taxIdentificationNumber: String,
    override var updatedAt: LocalDateTime?
) : IEmployee

interface IEmployee {
    val givenName: String
    val surname: String
    val birthDate: LocalDate
    val pensionInsuranceNumber: String
    val taxIdentificationNumber: String
    var updatedAt: LocalDateTime?
}