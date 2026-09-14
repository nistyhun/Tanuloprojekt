package com.example

import com.example.Repository.categoryExists
import com.example.Repository.deleteOrderById
import com.example.Repository.getAllOrders
import com.example.Repository.getOrderById
import com.example.Repository.patchOrder
import com.example.Repository.updateOrder
import com.example.exception.CategoryNotFoundException
import com.example.exception.OrderNotFoundException
import com.example.exception.ValidationException
import com.example.model.CreateOrderRequest
import com.example.model.PatchOrderRequest
import com.example.model.UpdateOrderRequest
import com.example.service.createOrderService
import com.example.service.patchOrderService
import com.example.service.updateOrderService
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.time.LocalDate

fun Application.configureRouting() {
    routing {
        get("/orders") {
            val orders = getAllOrders()
            call.respond(orders)
        }
        get("/orders/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

            val order = getOrderById(id) ?: throw OrderNotFoundException("Order not found")

            call.respond(HttpStatusCode.OK, order)
        }
        delete("/orders/{id}") {
            val id = call.parameters["id"]?.toIntOrNull() ?: throw ValidationException("Invalid order id")

            deleteOrderById(id) ?: throw OrderNotFoundException("Order not found")

            call.respond(HttpStatusCode.NoContent)
        }
        post("/orders") {
            val request = call.receiveNullable<CreateOrderRequest>()
                ?: throw ValidationException("Invalid request body")

            val newOrder = createOrderService(request)

            call.respond(HttpStatusCode.Created, newOrder)
        }

        put("/orders/{id}") {
            val id = call.parameters["id"]?.toIntOrNull()
                ?: throw ValidationException("Invalid order id")

            val request = call.receiveNullable<UpdateOrderRequest>()
                ?: throw ValidationException("Invalid request body")

            updateOrderService(id, request)

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

            patchOrderService(id, request)

            call.respond(HttpStatusCode.OK,
                "Updated order successfully")
        }
    }
}