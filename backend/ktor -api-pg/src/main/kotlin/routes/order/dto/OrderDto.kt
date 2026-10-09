package com.example.routes.order.dto

import com.example.domain.order.Order
import com.example.setup.plugin.serialization.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class OrderDto(
    val id: Int,
    val categoryId: Int,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
) {
    companion object {
        fun fromEntity(order: Order): OrderDto {
            return OrderDto(
                id = order.id,
                categoryId = order.categoryId,
                customerName = order.customerName,
                deadline = order.deadline,
                quantity = order.quantity,
                publisherName = order.publisherName
            )
        }
    }
}