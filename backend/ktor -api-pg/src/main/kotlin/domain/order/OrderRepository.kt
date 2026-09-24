package com.example.domain.order

import com.example.repository.order.dto.CreateOrderRequest
import com.example.repository.order.dto.OrderDetailsResponse
import com.example.repository.order.dto.OrderResponse
import com.example.repository.order.dto.PatchOrderRequest
import com.example.repository.order.dto.UpdateOrderRequest

interface OrderRepository {
    fun getAllOrders(): List<OrderResponse>

    fun getOrderById(id: Int): OrderDetailsResponse?

    fun deleteOrderById(id: Int): Int?

    fun categoryExists(id: Int): Boolean

    fun createOrder(request: CreateOrderRequest): OrderResponse

    fun updateOrder(id: Int, request: UpdateOrderRequest): Int

    fun patchOrder(id: Int, request: PatchOrderRequest): Int
}