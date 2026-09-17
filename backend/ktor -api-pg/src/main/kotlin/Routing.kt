package com.example

import com.example.exception.ValidationException
import com.example.model.order.CreateOrderRequest
import com.example.model.order.PatchOrderRequest
import com.example.model.order.UpdateOrderRequest
import com.example.model.user.LoginRequest
import com.example.model.user.RegisterRequest
import com.example.security.requireRole
import com.example.service.OrderService
import com.example.service.AuthService
import com.example.service.CategoryService
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.auth.authenticate
import io.ktor.server.auth.jwt.JWTPrincipal
import io.ktor.server.auth.principal
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(
    orderService: OrderService,
    authService: AuthService,
    categoryService: CategoryService
) {
    routing {
        authenticate("auth-jwt") {
            val adminRole = "ADMIN"

            get("/orders") {
                val orders = orderService.getAllOrders()
                call.respond(orders)
            }
            get("/orders/{id}") {
                val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

                val order = orderService.getOrderById(id)

                call.respond(HttpStatusCode.OK, order)
            }

            get("/categories"){
                val categories = categoryService.getAllCategories()
                call.respond(categories)
            }

            delete("/orders/{id}") {
                call.requireRole(adminRole)
                val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

                orderService.deleteOrderById(id)

                call.respond(HttpStatusCode.NoContent)
            }
            post("/orders") {
                call.requireRole(adminRole)
                val request = call.receiveNullable<CreateOrderRequest>()
                    ?: throw ValidationException("Invalid request body")

                val newOrder = orderService.createOrder(request)

                call.respond(HttpStatusCode.Created, newOrder)
            }

            put("/orders/{id}") {
                call.requireRole(adminRole)
                val id = call.parameters["id"]?.toIntOrNull()
                    ?: throw ValidationException("Invalid order id")

                val request = call.receiveNullable<UpdateOrderRequest>()
                    ?: throw ValidationException("Invalid request body")

                orderService.updateOrder(id, request)

                call.respond(
                    HttpStatusCode.OK,
                    "Updated order successfully"
                )
            }

            patch("/orders/{id}") {
                call.requireRole(adminRole)
                val id = call.parameters["id"]?.toIntOrNull()
                    ?: throw ValidationException("Invalid order id")

                val request = call.receiveNullable<PatchOrderRequest>()
                    ?: throw ValidationException("Invalid request body")

                orderService.patchOrder(id, request)

                call.respond(
                    HttpStatusCode.OK,
                    "Updated order successfully"
                )
            }
            get("/auth/me") {
                val principal = call.principal<JWTPrincipal>()
                    ?: throw ValidationException("Unauthorized")

                val userId = principal.payload
                    .getClaim("userId")
                    .asInt()
                    ?: throw ValidationException("Invalid token")

                val user = authService.getCurrentUser(userId)

                call.respond(
                    HttpStatusCode.OK,
                    user
                )
            }
        }

        post("/auth/register") {
            val request = call.receiveNullable<RegisterRequest>()
                ?: throw ValidationException("Invalid request body")

            val user = authService.register(request)

            call.respond(
                HttpStatusCode.Created,
                user
            )
        }

        post("/auth/login") {
            val request = call.receiveNullable<LoginRequest>()
                ?: throw ValidationException("Invalid request body")

            val response = authService.login(request)

            call.respond(
                HttpStatusCode.OK,
                response
            )
        }
    }
}