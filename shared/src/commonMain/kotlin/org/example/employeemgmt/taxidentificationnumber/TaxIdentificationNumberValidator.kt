package org.example.employeemgmt.taxidentificationnumber

object TaxIdentificationNumberValidator {
    fun isValid(taxId: String): Boolean {
        if (hasInvalidFormat(taxId)) return false
        if (hasIncorrectChecksum(taxId)) return false
        return true
    }

    private fun hasInvalidFormat(taxId: String): Boolean {
        val regex = Regex("^\\d{11}\$")
        return !regex.matches(taxId)
    }

    private fun hasIncorrectChecksum(taxId: String): Boolean {
        val body = taxId.substring(0, 10) // erste 10 Ziffern
        val givenCheck = taxId[10] - '0'
        val expectedCheck = computeCheckDigitIso7064Mod11_10(body)
        return givenCheck != expectedCheck
    }

    private fun computeCheckDigitIso7064Mod11_10(body: String): Int {
        var carry = 10
        for (ch in body) {
            val n = ch - '0'
            var s = (n + carry) % 10
            if (s == 0) s = 10
            carry = (s * 2) % 11
        }
        val check = (11 - carry) % 10
        return check
    }
}