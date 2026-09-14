package com.example.database

import io.ktor.server.application.Application
import org.flywaydb.core.Flyway

fun migrateDatabase(application: Application) {
    val config = application.environment.config

    val url = config.property("database.url").getString()
    val user = config.property("database.user").getString()
    val password = config.property("database.password").getString()

    val flyway = Flyway.configure()
        .dataSource(url, user, password)
        .locations("classpath:db/migration")
        .load()

    flyway.migrate()
}