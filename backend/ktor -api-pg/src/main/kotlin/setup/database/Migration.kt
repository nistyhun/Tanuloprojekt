package com.example.setup.database

import org.flywaydb.core.Flyway

fun migrateDatabase(dbUrl: String, username: String, password: String) {

    val flyway = Flyway.configure()
        .dataSource(dbUrl, username, password)
        .locations("classpath:db/migration")
        .load()

    flyway.migrate()
}