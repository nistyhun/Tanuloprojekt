package com.example

import com.example.database.Categories
import com.example.database.Orders
import com.example.database.connectToDB
import com.example.database.seedDB
import org.jetbrains.exposed.v1.jdbc.SchemaUtils
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import io.ktor.server.application.*

fun main(args: Array<String>) {

    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {

    connectToDB(this)

    transaction {
        SchemaUtils.create(Categories, Orders)
    }

    seedDB()

    configureSerialization()
    configureStatusPages()
    configureRouting()
}
