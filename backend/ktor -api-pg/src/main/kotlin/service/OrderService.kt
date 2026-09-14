package com.example.service

import com.example.Repository.categoryExists
import com.example.Repository.createOrder
import com.example.Repository.patchOrder
import com.example.Repository.updateOrder
import com.example.exception.CategoryNotFoundException
import com.example.exception.OrderNotFoundException
import com.example.exception.ValidationException
import com.example.model.CreateOrderRequest
import com.example.model.OrderResponse
import com.example.model.PatchOrderRequest
import com.example.model.UpdateOrderRequest
import java.time.LocalDate

fun createOrderService(request: CreateOrderRequest): OrderResponse {

    if (!categoryExists(request.categoryId)) {
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

    return createOrder(request)
}

fun updateOrderService(id: Int, request: UpdateOrderRequest) {
    if (!categoryExists(request.categoryId)) {
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
        throw ValidationException("PublisherName cannot be blank")
    }

    if (updateOrder(id, request)== 0){
        throw OrderNotFoundException("No order was updated")
    }
}

fun patchOrderService(id: Int, request: PatchOrderRequest) {
    if (request.categoryId != null && !categoryExists(request.categoryId)){
        throw CategoryNotFoundException("Category not found")
    }

    if (request.customerName != null && request.customerName.isBlank()){
        throw ValidationException("Customer name cannot be blank")
    }

    if (request.deadline != null && request.deadline.isBefore(LocalDate.now())) {
        throw ValidationException("Deadline cannot be in the past")
    }

    if (request.quantity != null && request.quantity <= 0) {
        throw ValidationException("Quantity must be greater than zero")
    }

    if (request.publisherName != null && request.publisherName.isBlank()) {
        throw ValidationException("PublisherName cannot be blank")
    }

    if (patchOrder(id, request) == 0){
        throw OrderNotFoundException("Order not found")
    }
}