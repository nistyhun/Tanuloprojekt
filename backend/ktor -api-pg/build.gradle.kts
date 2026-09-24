buildscript {
    repositories {
        mavenCentral()
    }

    dependencies {
        classpath("org.flywaydb:flyway-database-postgresql:13.2.0")
        classpath("org.postgresql:postgresql:42.7.8")
    }
}

plugins {
    alias(libs.plugins.kotlin.jvm)
    alias(ktorLibs.plugins.ktor)
    kotlin("plugin.serialization") version "2.4.0"
    id("co.uzzu.dotenv.gradle") version "4.0.0"
    id("org.flywaydb.flyway") version "13.2.0"
}

group = "com.example"
version = "1.0.0-SNAPSHOT"

application {
    mainClass = "io.ktor.server.netty.EngineMain"
}

kotlin {
    jvmToolchain(17)
}

fun getenv(name: String): String? {
    val originalEnv = System.getenv(name)

    if (originalEnv?.isNotBlank() == true) {
        return originalEnv
    }

    return env.fetchOrNull(name)
}

dependencies {
    implementation(ktorLibs.server.config.yaml)
    implementation(ktorLibs.server.core)
    implementation(ktorLibs.server.netty)
    implementation(libs.logback.classic)

    val exposedVersion = "1.5.0"
    implementation("org.jetbrains.exposed:exposed-core:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-java-time:$exposedVersion")
    implementation("org.jetbrains.exposed:exposed-migration-jdbc:${exposedVersion}")
    implementation("org.postgresql:postgresql:42.7.8")
    implementation("net.datafaker:datafaker:2.4.4")
    implementation("io.ktor:ktor-server-content-negotiation:3.5.2")
    implementation("io.ktor:ktor-serialization-kotlinx-json:3.5.2")
    implementation("com.zaxxer:HikariCP:6.3.0")
    implementation("io.ktor:ktor-server-status-pages:3.5.2")
    implementation("org.flywaydb:flyway-core:13.2.0")
    implementation("org.flywaydb:flyway-database-postgresql:13.2.0")
    implementation("de.mkammerer:argon2-jvm:2.11")
    implementation("io.ktor:ktor-server-auth-jwt:3.5.2")
    implementation("io.ktor:ktor-server-cors-jvm:2.3.12")

    testImplementation(kotlin("test"))
    testImplementation(ktorLibs.server.testHost)
}

tasks.withType<JavaExec>().configureEach {
    environment.putAll(env.allVariables())
}

flyway {
    url = getenv("DB_URL")
    user = getenv("DB_USER")
    password = getenv("DB_PASSWORD")
    cleanDisabled = false
}

tasks.register("diff", JavaExec::class) {
    description = "Print missing SQL statements"
    group = "migration"
    classpath = sourceSets.main.get().runtimeClasspath

    //environment.putAll(env.allVariables())
    mainClass.set("com.example.setup.database.PrintMissingSQLStatementsKt")
}