package com.example

import com.example.setup.database.connectToDB
import com.example.setup.database.migrateDatabase
import com.example.setup.database.seedDB
import com.example.repository.category.DbCategoryRepository
import com.example.repository.order.DbOrderRepository
import com.example.repository.user.DbUserRepository
import com.example.routes.configureRouting
import com.example.setup.plugin.auth.JwtConfig
import com.example.domain.auth.AuthService
import com.example.domain.category.CategoryService
import com.example.domain.order.OrderService
import com.example.setup.plugin.configureCors
import com.example.setup.plugin.configureSerialization
import com.example.setup.plugin.configureStatusPages
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {

    val config = environment.config

    val dbUrl = config.property("database.url").getString()
    val username = config.property("database.user").getString()
    val password = config.property("database.password").getString()

    connectToDB(dbUrl, username, password)

    migrateDatabase(dbUrl, username, password)

    val dbUserRepository = DbUserRepository()

    val adminEmail = config.property("admin.email").getString()
    val adminPassword = config.property("admin.password").getString()

    seedDB(dbUserRepository, adminEmail, adminPassword)

    val dbOrderRepository = DbOrderRepository()
    val orderService = OrderService(dbOrderRepository)

    val jwtConfig = JwtConfig(this)
    val authService = AuthService(dbUserRepository, jwtConfig)

    val categoryRepository = DbCategoryRepository()
    val categoryService = CategoryService(categoryRepository)

    configureSerialization()
    configureStatusPages()
    configureCors()
    configureAuthentication(jwtConfig)

    configureRouting(
        orderService,
        authService,
        categoryService,
    )
}