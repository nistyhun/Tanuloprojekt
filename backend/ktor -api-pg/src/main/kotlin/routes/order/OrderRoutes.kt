package com.example.routes.order

import com.example.domain.exception.ValidationException
import com.example.repository.order.dto.CreateOrderRequest
import com.example.repository.order.dto.PatchOrderRequest
import com.example.repository.order.dto.UpdateOrderRequest
import com.example.setup.plugin.auth.requireRole
import com.example.domain.order.OrderService
import io.ktor.http.HttpStatusCode
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.delete
import io.ktor.server.routing.get
import io.ktor.server.routing.patch
import io.ktor.server.routing.post
import io.ktor.server.routing.put
import kotlin.text.toIntOrNull

fun Route.configureOrderRoutes(orderService: OrderService) {
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
}