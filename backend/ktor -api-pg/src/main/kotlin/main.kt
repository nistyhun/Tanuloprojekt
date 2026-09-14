package com.example

import com.example.database.connectToDB
import com.example.database.migrateDatabase
import com.example.database.seedDB
import com.example.repository.OrderRepository
import com.example.repository.UserRepository
import com.example.service.AuthService
import com.example.service.OrderService
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {

    connectToDB(this)

    migrateDatabase(this)

    seedDB()

    configureSerialization()
    configureStatusPages()

    val orderRepository = OrderRepository()
    val orderService = OrderService(orderRepository)

    val userRepository = UserRepository()
    val authService = AuthService(userRepository)

    configureRouting(
        orderService,
        authService
    )
}