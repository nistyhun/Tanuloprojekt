package com.example.repository.order

import com.example.domain.category.Category
import com.example.domain.order.CreateOrder
import com.example.repository.category.CategoryTable
import com.example.repository.rest.DbRestRepository
import com.example.domain.order.Order
import com.example.domain.order.OrderDetails
import com.example.domain.order.OrderRepository
import com.example.domain.order.PatchOrder
import com.example.domain.order.UpdateOrder
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.deleteWhere
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.jdbc.update

class DbOrderRepository:
    DbRestRepository(OrderTable),
    OrderRepository {

    override suspend fun getAllOrders(): List<Order> {
        return transaction {
            OrderTable.selectAll().map { row ->
                Order(
                    id = row[OrderTable.id].value,
                    categoryId = row[OrderTable.categoryId].value,
                    customerName = row[OrderTable.customerName],
                    deadline = row[OrderTable.deadline],
                    quantity = row[OrderTable.quantity],
                    publisherName = row[OrderTable.publisherName]
                )
            }
        }
    }

    override suspend fun getOrderById(id: Int): OrderDetails? {
        return transaction {
            val order = (OrderTable innerJoin CategoryTable)
                .selectAll()
                .where { OrderTable.id eq id }
                .singleOrNull()

            if (order == null) {
                return@transaction null
            }

            OrderDetails(
                id = order[OrderTable.id].value,
                category = Category(
                    id = order[CategoryTable.id].value,
                    type = order[CategoryTable.type]
                ),
                customerName = order[OrderTable.customerName],
                deadline = order[OrderTable.deadline],
                quantity = order[OrderTable.quantity],
                publisherName = order[OrderTable.publisherName]
            )
        }
    }

    override suspend fun deleteOrderById(id: Int): Int? {
        return transaction {
            val order = OrderTable
                .selectAll()
                .where { OrderTable.id eq id }
                .singleOrNull()

            if (order == null) {
                return@transaction null
            }

            OrderTable.deleteWhere { OrderTable.id eq id }
        }
    }

    override suspend fun categoryExists(id: Int): Boolean {
        return transaction {
            CategoryTable
                .selectAll()
                .where { CategoryTable.id eq id }
                .singleOrNull() != null
        }
    }

    override suspend fun createOrder(request: CreateOrder): Order {
        return transaction {
            val newOrder = OrderTable.insert {
                it[categoryId] = request.categoryId
                it[customerName] = request.customerName.trim()
                it[deadline] = request.deadline
                it[quantity] = request.quantity
                it[publisherName] = request.publisherName.trim()
                setCreatedTimestamps(it)
            }

            Order(
                id = newOrder[OrderTable.id].value,
                categoryId = request.categoryId,
                customerName = request.customerName.trim(),
                deadline = request.deadline,
                quantity = request.quantity,
                publisherName = request.publisherName.trim()
            )
        }
    }

    override suspend fun updateOrder(id: Int, request: UpdateOrder): Int {
        return transaction {
            OrderTable.update({ OrderTable.id eq id }) {
                it[categoryId] = request.categoryId
                it[customerName] = request.customerName.trim()
                it[deadline] = request.deadline
                it[quantity] = request.quantity
                it[publisherName] = request.publisherName.trim()
                setUpdatedTimestamps(it)
            }
        }
    }

    override suspend fun patchOrder(id: Int, request: PatchOrder): Int {
        return transaction {
            OrderTable.update({ OrderTable.id eq id }) {
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
                setUpdatedTimestamps(it)
            }
        }
    }
}