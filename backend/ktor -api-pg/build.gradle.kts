plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(ktorLibs.plugins.ktor)
    kotlin("plugin.serialization") version "2.4.0"
}

group = "com.example"
version = "1.0.0-SNAPSHOT"

application {
    mainClass = "io.ktor.server.netty.EngineMain"
}

kotlin {
    jvmToolchain(17)
}
dependencies {
    implementation(ktorLibs.server.config.yaml)
    implementation(ktorLibs.server.core)
    implementation(ktorLibs.server.netty)
    implementation(libs.logback.classic)
    implementation("org.jetbrains.exposed:exposed-core:1.5.0")
    implementation("org.jetbrains.exposed:exposed-jdbc:1.5.0")
    implementation("org.jetbrains.exposed:exposed-java-time:1.5.0")
    implementation("org.postgresql:postgresql:42.7.8")
    implementation("net.datafaker:datafaker:2.4.4")
    implementation("io.ktor:ktor-server-content-negotiation:3.5.2")
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.5.2")
    implementation("com.zaxxer:HikariCP:6.3.0")
    implementation("io.ktor:ktor-server-status-pages:3.5.2")
    implementation("org.flywaydb:flyway-core:13.2.0")
    implementation("org.flywaydb:flyway-database-postgresql:13.2.0")
    implementation("de.mkammerer:argon2-jvm:2.11")

    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)
}