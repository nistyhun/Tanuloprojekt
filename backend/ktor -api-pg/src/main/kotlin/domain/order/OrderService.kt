package com.example.domain.order

import com.example.domain.exception.CategoryNotFoundException
import com.example.domain.exception.OrderNotFoundException
import com.example.domain.exception.ValidationException
import java.time.LocalDate

class OrderService(
    private val orderRepository: OrderRepository
) {

    suspend fun getAllOrders(): List<Order> {
        return orderRepository.getAllOrders()
    }

    suspend fun getOrderById(id: Int): OrderDetails {
        return orderRepository.getOrderById(id)
            ?: throw OrderNotFoundException("Order not found")
    }

    suspend fun deleteOrderById(id: Int) {
        orderRepository.deleteOrderById(id)
            ?: throw OrderNotFoundException("Order not found")
    }

    suspend fun createOrder(request: CreateOrder): Order {
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

    suspend fun updateOrder(id: Int, request: UpdateOrder) {
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

    suspend fun patchOrder(id: Int, request: PatchOrder) {
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