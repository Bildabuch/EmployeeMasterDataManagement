package com.kaestner.utils

import jakarta.persistence.AttributeConverter
import jakarta.persistence.Converter
import kotlinx.datetime.LocalDateTime
import java.sql.Timestamp

/**
 * JPA converter to persist kotlinx.datetime.LocalDateTime as java.sql.Timestamp.
 * Applied automatically to all LocalDateTime attributes.
 */
@Converter(autoApply = true)
class LocalDateTimeAttributeConverter : AttributeConverter<LocalDateTime, Timestamp> {
    override fun convertToDatabaseColumn(attribute: LocalDateTime?): Timestamp? {
        return attribute?.let {
            val jdt = java.time.LocalDateTime.of(
                it.year,
                it.monthNumber,
                it.dayOfMonth,
                it.hour,
                it.minute,
                it.second,
                it.nanosecond
            )
            Timestamp.valueOf(jdt)
        }
    }

    override fun convertToEntityAttribute(dbData: Timestamp?): LocalDateTime? {
        return dbData?.toLocalDateTime()?.let {
            LocalDateTime(it.year, it.monthValue, it.dayOfMonth, it.hour, it.minute, it.second, it.nano)
        }
    }
}
