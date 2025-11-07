package org.example.employeemgmt.i18n

import kotlinx.serialization.json.Json.Default.decodeFromString

@JsModule("./i18n_de.json")
@JsNonModule
private external val i18n_de: String

@JsModule("./i18n_en.json")
@JsNonModule
private external val i18n_en: String

actual fun loadLabels(locale: String): Map<String, String> {
    val raw = when (locale) {
        "de" -> i18n_de
        "en" -> i18n_en
        else -> throw IllegalArgumentException("Unsupported locale $locale")
    }
    val text: String = if (raw is String) {
        raw
    } else {
        js("JSON").stringify(raw) as String
    }

    return decodeFromString<Map<String, String>>(text)

}
