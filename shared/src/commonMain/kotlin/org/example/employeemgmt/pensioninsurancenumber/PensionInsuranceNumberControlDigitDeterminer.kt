package org.example.employeemgmt.pensioninsurancenumber

object PensionInsuranceNumberControlDigitDeterminer {
    const val INITIAL_LETTER_POSITION = 8
    val multipliers = listOf(2, 1, 2, 5, 7, 1, 2, 1, 2, 1, 2, 1)

    fun determine(pensionInsuranceNumber: PensionInsuranceNumber): Result<Int> = runCatching {
        val letterValue = determineLetterValue(pensionInsuranceNumber.initialLetter)
        val number12Digits = pensionInsuranceNumber.toString()
            .replaceRange(INITIAL_LETTER_POSITION, INITIAL_LETTER_POSITION + 1, letterValue)
            .dropLast(1) // remove existing control digit

        require(number12Digits.length == 12) { "The processed number must have exactly 12 digits, but got: $number12Digits" }
        val sum = calculateSumOfProduct(number12Digits)
        val controlDigit = sum % 10
        controlDigit
    }

    private fun calculateSumOfProduct(number12Digits: String): Int = number12Digits.mapIndexed { index, c ->
        val product = (c - '0') * multipliers[index]
        product.toString().sumOf { it - '0' }
    }.sum()


    private fun determineLetterValue(initialLetter: String): String {
        val letterValue = (initialLetter.uppercase()[0] - 'A' + 1)
        return letterValue.toString().padStart(2, '0')
    }
}