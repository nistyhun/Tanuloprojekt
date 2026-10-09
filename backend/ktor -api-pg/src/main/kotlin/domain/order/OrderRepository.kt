package com.example.domain.order

interface OrderRepository {
    suspend fun getAllOrders(): List<Order>

    suspend fun getOrderById(id: Int): OrderDetails?

    suspend fun deleteOrderById(id: Int): Int?

    suspend fun categoryExists(id: Int): Boolean

    suspend fun createOrder(request: CreateOrder): Order

    suspend fun updateOrder(id: Int, request: UpdateOrder): Int

    suspend fun patchOrder(id: Int, request: PatchOrder): Int
}