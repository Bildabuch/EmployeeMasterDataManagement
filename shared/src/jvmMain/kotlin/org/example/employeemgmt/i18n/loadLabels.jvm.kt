package org.example.employeemgmt.i18n

actual fun loadLabels(locale: String): Map<String, String> {
    val path = "/i18n_${locale}.json"
    val stream = {}::class.java.getResourceAsStream(path)
        ?: throw IllegalArgumentException("Resource not found: $path")
    val text = stream.bufferedReader().readText()
    return kotlinx.serialization.json.Json.decodeFromString(text)
}
