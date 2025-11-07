package org.example.employeemgmt.i18n

class LabelService(val locale: String) {
    fun translate(labelKey: String): String {
        val labels = loadLabels(locale)
        return labels[labelKey] ?: labelKey
    }
}