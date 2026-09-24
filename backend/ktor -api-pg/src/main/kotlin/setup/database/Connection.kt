package com.example.setup.database

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.Application
import org.jetbrains.exposed.v1.jdbc.Database

fun connectToDB(dbUrl: String, username: String, password: String) {

    val hikariConfig = HikariConfig().apply {
        this.jdbcUrl = dbUrl
        driverClassName = "org.postgresql.Driver"
        this.username = username
        this.password = password

        maximumPoolSize = 10
        // isAutoCommit = false
        // transactionIsolation = "TRANSACTION_REPEATABLE_READ"
    }

    val dataSource = HikariDataSource(hikariConfig)

    Database.connect(dataSource)
}