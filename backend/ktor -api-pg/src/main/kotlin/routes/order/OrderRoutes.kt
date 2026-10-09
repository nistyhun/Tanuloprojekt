package com.example.routes.order

import com.example.domain.exception.ValidationException
import com.example.routes.order.dto.CreateOrderDto
import com.example.routes.order.dto.PatchOrderDto
import com.example.routes.order.dto.UpdateOrderDto
import com.example.setup.plugin.auth.requireRole
import com.example.domain.order.OrderService
import com.example.routes.order.dto.OrderDetailsDto
import com.example.routes.order.dto.OrderListDto
import com.example.routes.order.dto.OrderDto
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
        call.respond(OrderListDto.fromEntity(orders))
    }
    get("/orders/{id}") {
        val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

        val order = orderService.getOrderById(id)

        call.respond(HttpStatusCode.OK, OrderDetailsDto.fromEntity(order))
    }
    delete("/orders/{id}") {
        call.requireRole(adminRole)
        val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

        orderService.deleteOrderById(id)

        call.respond(HttpStatusCode.NoContent)
    }
    post("/orders") {
        call.requireRole(adminRole)

        val request = call.receiveNullable<CreateOrderDto>()
            ?: throw ValidationException("Invalid request body")

        val newOrder = orderService.createOrder(request.toEntity())

        call.respond(
            HttpStatusCode.Created,
            OrderDto.fromEntity(newOrder)
        )
    }

    put("/orders/{id}") {
        call.requireRole(adminRole)
        val id = call.parameters["id"]?.toIntOrNull()
            ?: throw ValidationException("Invalid order id")

        val request = call.receiveNullable<UpdateOrderDto>()
            ?: throw ValidationException("Invalid request body")

        orderService.updateOrder(id, request.toEntity())

        call.respond(
            HttpStatusCode.OK,
            "Updated order successfully"
        )
    }

    patch("/orders/{id}") {
        call.requireRole(adminRole)
        val id = call.parameters["id"]?.toIntOrNull()
            ?: throw ValidationException("Invalid order id")

        val request = call.receiveNullable<PatchOrderDto>()
            ?: throw ValidationException("Invalid request body")

        orderService.patchOrder(id, request.toEntity())

        call.respond(
            HttpStatusCode.OK,
            "Updated order successfully"
        )
    }
}