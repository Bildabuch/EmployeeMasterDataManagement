package org.example.employeemgmt

open class EmployeeValidationException(val errorKey:String, message: String = "Employee validation failed with error key: $errorKey")
    :IllegalArgumentException(message) {
}