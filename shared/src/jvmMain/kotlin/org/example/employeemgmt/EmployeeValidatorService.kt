package org.example.employeemgmt

object EmployeeValidatorService {
    @JvmStatic
    fun validate(employee: IEmployee): Map<String, String> {
        return EmployeeValidator.validate(
            Employee(
                givenName = employee.givenName,
                surname = employee.surname,
                birthDate = employee.birthDate,
                pensionInsuranceNumber = employee.pensionInsuranceNumber,
                taxIdentificationNumber = employee.taxIdentificationNumber,
                updatedAt = employee.updatedAt
            )
        )
    }
}