package com.kaestner

import com.kaestner.domain.testdata.TestDataGenerator
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = ["com.kaestner"])
class EmployeeMasterDataMgmtApplication {

    @Bean
    fun init(testDataGenerator: TestDataGenerator): CommandLineRunner {
        return CommandLineRunner {
            testDataGenerator.generate()
        }
    }
}

fun main(args: Array<String>) {
    runApplication<EmployeeMasterDataMgmtApplication>(*args)
}