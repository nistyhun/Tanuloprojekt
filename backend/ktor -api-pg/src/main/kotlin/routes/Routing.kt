package com.example.routes

import com.example.routes.auth.configureAuthRoutes
import com.example.routes.auth.configureProtectedAuthRoutes
import com.example.routes.category.configureCategoryRoutes
import com.example.routes.order.configureOrderRoutes
import com.example.domain.order.OrderService
import com.example.domain.auth.AuthService
import com.example.domain.category.CategoryService
import io.ktor.server.application.*
import io.ktor.server.auth.authenticate
import io.ktor.server.routing.*

fun Application.configureRouting(
    orderService: OrderService,
    authService: AuthService,
    categoryService: CategoryService
) {
    routing {
        authenticate("auth-jwt") {

            configureOrderRoutes(orderService)
            configureCategoryRoutes(categoryService)
            configureProtectedAuthRoutes(authService)
        }

        configureAuthRoutes(authService)

    }
}