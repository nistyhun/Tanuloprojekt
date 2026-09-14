package com.example.repository

import com.example.database.Categories
import com.example.database.Orders
import com.example.model.category.CategoryResponse
import com.example.model.order.CreateOrderRequest
import com.example.model.order.OrderDetailsResponse
import com.example.model.order.OrderResponse
import com.example.model.order.PatchOrderRequest
import com.example.model.order.UpdateOrderRequest
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update

class OrderRepository {

    fun getAllOrders(): List<OrderResponse> {
        return transaction {
            Orders.selectAll().map { row ->
                OrderResponse(
                    id = row[Orders.id],
                    categoryId = row[Orders.categoryId],
                    customerName = row[Orders.customerName],
                    deadline = row[Orders.deadline],
                    quantity = row[Orders.quantity],
                    publisherName = row[Orders.publisherName]
                )
            }
        }
    }

    fun getOrderById(id: Int): OrderDetailsResponse? {
        return transaction {
            val order = (Orders innerJoin Categories)
                .selectAll()
                .where { Orders.id eq id }
                .singleOrNull()

            if (order == null) {
                return@transaction null
            }

            OrderDetailsResponse(
                id = order[Orders.id],
                category = CategoryResponse(
                    id = order[Categories.id],
                    type = order[Categories.type]
                ),
                customerName = order[Orders.customerName],
                deadline = order[Orders.deadline],
                quantity = order[Orders.quantity],
                publisherName = order[Orders.publisherName]
            )
        }
    }

    fun deleteOrderById(id: Int): Int? {
        return transaction {
            val order = Orders
                .selectAll()
                .where { Orders.id eq id }
                .singleOrNull()

            if (order == null) {
                return@transaction null
            }

            Orders.deleteWhere { Orders.id eq id }
        }
    }

    fun categoryExists(id: Int): Boolean {
        return transaction {
            Categories
                .selectAll()
                .where { Categories.id eq id }
                .singleOrNull() != null
        }
    }

    fun createOrder(request: CreateOrderRequest): OrderResponse {
        return transaction {
            val newOrder = Orders.insert {
                it[categoryId] = request.categoryId
                it[customerName] = request.customerName.trim()
                it[deadline] = request.deadline
                it[quantity] = request.quantity
                it[publisherName] = request.publisherName.trim()
            }

            OrderResponse(
                id = newOrder[Orders.id],
                categoryId = request.categoryId,
                customerName = request.customerName.trim(),
                deadline = request.deadline,
                quantity = request.quantity,
                publisherName = request.publisherName.trim()
            )
        }
    }

    fun updateOrder(id: Int, request: UpdateOrderRequest): Int {
        return transaction {
            Orders.update({ Orders.id eq id }) {
                it[categoryId] = request.categoryId
                it[customerName] = request.customerName.trim()
                it[deadline] = request.deadline
                it[quantity] = request.quantity
                it[publisherName] = request.publisherName.trim()
            }
        }
    }

    fun patchOrder(id: Int, request: PatchOrderRequest): Int {
        return transaction {
            Orders.update({ Orders.id eq id }) {
                if (request.categoryId != null) {
                    it[categoryId] = request.categoryId
                }
                if (request.customerName != null) {
                    it[customerName] = request.customerName.trim()
                }
                if (request.deadline != null) {
                    it[deadline] = request.deadline
                }
                if (request.quantity != null) {
                    it[quantity] = request.quantity
                }
                if (request.publisherName != null) {
                    it[publisherName] = request.publisherName.trim()
                }
            }
        }
    }
}