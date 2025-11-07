package org.example.employeemgmt.pensioninsurancenumber

import kotlin.js.ExperimentalJsExport
import kotlin.js.JsExport

@OptIn(ExperimentalJsExport::class)
@JsExport
@ConsistentCopyVisibility
data class PensionInsuranceNumber internal constructor(
    val institutionAreaCode: Int,
    val yearShort: Int,
    val month: Int,
    val day: Int,
    val initialLetter: String,
    val serialNumber: String,
    val controlDigit: Int
) {
    override fun toString(): String {
        val day = day.toString().padStart(2, '0')
        val month = month.toString().padStart(2, '0')
        val year = yearShort.toString().padStart(2, '0')
        return "$institutionAreaCode$day$month$year$initialLetter$serialNumber$controlDigit"
    }
}
