package com.example.service

import com.example.exception.CategoryNotFoundException
import com.example.exception.OrderNotFoundException
import com.example.exception.ValidationException
import com.example.model.order.CreateOrderRequest
import com.example.model.order.OrderDetailsResponse
import com.example.model.order.OrderResponse
import com.example.model.order.PatchOrderRequest
import com.example.model.order.UpdateOrderRequest
import com.example.repository.OrderRepository
import java.time.LocalDate

class OrderService(
    private val orderRepository: OrderRepository
) {

    fun getAllOrders(): List<OrderResponse> {
        return orderRepository.getAllOrders()
    }

    fun getOrderById(id: Int): OrderDetailsResponse {
        return orderRepository.getOrderById(id)
            ?: throw OrderNotFoundException("Order not found")
    }

    fun deleteOrderById(id: Int) {
        orderRepository.deleteOrderById(id)
            ?: throw OrderNotFoundException("Order not found")
    }

    fun createOrder(request: CreateOrderRequest): OrderResponse {
        if (!orderRepository.categoryExists(request.categoryId)) {
            throw CategoryNotFoundException("Category not found")
        }

        if (request.deadline.isBefore(LocalDate.now())) {
            throw ValidationException("Deadline cannot be in the past")
        }

        if (request.customerName.isBlank()) {
            throw ValidationException("Customer name cannot be blank")
        }

        if (request.quantity <= 0) {
            throw ValidationException("Quantity must be greater than zero")
        }

        if (request.publisherName.isBlank()) {
            throw ValidationException("Publisher name cannot be blank")
        }

        return orderRepository.createOrder(request)
    }

    fun updateOrder(id: Int, request: UpdateOrderRequest) {
        if (!orderRepository.categoryExists(request.categoryId)) {
            throw CategoryNotFoundException("Category not found")
        }

        if (request.deadline.isBefore(LocalDate.now())) {
            throw ValidationException("Deadline cannot be in the past")
        }

        if (request.customerName.isBlank()) {
            throw ValidationException("Customer name cannot be blank")
        }

        if (request.quantity <= 0) {
            throw ValidationException("Quantity must be greater than zero")
        }

        if (request.publisherName.isBlank()) {
            throw ValidationException("Publisher name cannot be blank")
        }

        if (orderRepository.updateOrder(id, request) == 0) {
            throw OrderNotFoundException("Order not found")
        }
    }

    fun patchOrder(id: Int, request: PatchOrderRequest) {
        if (request.categoryId != null &&
            !orderRepository.categoryExists(request.categoryId)
        ) {
            throw CategoryNotFoundException("Category not found")
        }

        if (request.customerName != null && request.customerName.isBlank()) {
            throw ValidationException("Customer name cannot be blank")
        }

        if (request.deadline != null &&
            request.deadline.isBefore(LocalDate.now())
        ) {
            throw ValidationException("Deadline cannot be in the past")
        }

        if (request.quantity != null && request.quantity <= 0) {
            throw ValidationException("Quantity must be greater than zero")
        }

        if (request.publisherName != null && request.publisherName.isBlank()) {
            throw ValidationException("Publisher name cannot be blank")
        }

        if (orderRepository.patchOrder(id, request) == 0) {
            throw OrderNotFoundException("Order not found")
        }
    }
}