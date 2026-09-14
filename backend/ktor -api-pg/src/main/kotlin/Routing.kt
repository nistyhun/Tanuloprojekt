package com.example

import com.example.exception.OrderNotFoundException
import com.example.exception.ValidationException
import com.example.model.order.CreateOrderRequest
import com.example.model.order.PatchOrderRequest
import com.example.model.order.UpdateOrderRequest
import com.example.model.user.RegisterRequest
import com.example.service.OrderService
import com.example.service.AuthService
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting(
    orderService: OrderService,
    authService: AuthService
) {
    routing {
        get("/orders") {
            val orders = orderService.getAllOrders()
            call.respond(orders)
        }
        get("/orders/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

            val order = orderService.getOrderById(id) ?: throw OrderNotFoundException("Order not found")

            call.respond(HttpStatusCode.OK, order)
        }
        delete("/orders/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

            orderService.deleteOrderById(id) ?: throw OrderNotFoundException("Order not found")

            call.respond(HttpStatusCode.NoContent)
        }
        post("/orders") {
            val request = call.receiveNullable<CreateOrderRequest>()
                ?: throw ValidationException("Invalid request body")

            val newOrder = orderService.createOrder(request)

            call.respond(HttpStatusCode.Created, newOrder)
        }

        put("/orders/{id}") {
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
            val id = call.parameters["id"]?.toIntOrNull()
                ?: throw ValidationException("Invalid order id")

            val request = call.receiveNullable<PatchOrderRequest>()
                ?: throw ValidationException("Invalid request body")

            orderService.patchOrder(id, request)

            call.respond(HttpStatusCode.OK,
                "Updated order successfully")
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
    }
}