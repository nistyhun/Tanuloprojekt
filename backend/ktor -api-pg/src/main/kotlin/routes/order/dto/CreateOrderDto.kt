package com.example.routes.order.dto

import com.example.domain.order.CreateOrder
import com.example.setup.plugin.serialization.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class CreateOrderDto(
    val categoryId: Int,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
) {
    fun toEntity(): CreateOrder {
        return CreateOrder(
            categoryId = categoryId,
            customerName = customerName,
            deadline = deadline,
            quantity = quantity,
            publisherName = publisherName
        )
    }
}