@file:OptIn(ExperimentalKotlinGradlePluginApi::class)

import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi

plugins {
    alias(libs.plugins.kotlinMultiplatform)

}
val copyI18nResources = tasks.register<Copy>("copyI18nResourcesToJsDist") {
    from(file("src/commonMain/resources"))
    include("i18n_*.json")
    into("${layout.buildDirectory}/dist/js/resources")
}

tasks.matching {
    it.name.contains("webpack", ignoreCase = true) ||
            it.name.contains("browser", ignoreCase = true)
}.configureEach {
    dependsOn(copyI18nResources)
}

tasks.register<Jar>("sharedJar") {
    archiveBaseName.set("shared")
    from(kotlin.jvm().compilations["main"].output)
}
kotlin {
    jvm{
    }

    js {
        outputModuleName = "shared"
        browser({
            commonWebpackConfig {
                sourceMaps = true
            }
        })
        binaries.library()
        generateTypeScriptDefinitions()
        compilerOptions {
            target = "es2015"
            sourceMap = true
        }
    }

    sourceSets {
        commonMain.dependencies {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
                implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.4.1")
            }
        }
        commonTest.dependencies {
            implementation(kotlin("test"))
        }
        jvmMain.dependencies {
            implementation(kotlin("stdlib-jdk8"))
            implementation(kotlin("test"))
        }
        jvmTest.dependencies {
            implementation(kotlin("test"))
        }
    }
}
