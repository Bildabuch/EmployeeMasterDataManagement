package com.kaestner.utils

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter
import kotlinx.datetime.LocalDate
import java.sql.Date

/**
 * JPA converter to persist kotlinx.datetime.LocalDate as java.sql.Date.
 * Applied automatically to all LocalDate attributes.
 */
@Converter(autoApply = true)
class LocalDateAttributeConverter : AttributeConverter<LocalDate, Date> {
    override fun convertToDatabaseColumn(attribute: LocalDate?): Date? {
        return attribute?.let {
            val jd = java.time.LocalDate.of(it.year, it.monthNumber, it.dayOfMonth)
            Date.valueOf(jd)
        }
    }

    override fun convertToEntityAttribute(dbData: Date?): LocalDate? {
        return dbData?.toLocalDate()?.let {
            LocalDate(it.year, it.monthValue, it.dayOfMonth)
        }
    }
}