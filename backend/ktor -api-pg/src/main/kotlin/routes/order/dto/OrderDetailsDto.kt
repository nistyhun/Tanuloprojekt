package com.example.routes.order.dto

import com.example.domain.order.OrderDetails
import com.example.routes.category.dto.CategoryDto
import com.example.setup.plugin.serialization.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class OrderDetailsDto(
    val id: Int,
    val category: CategoryDto,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
) {
    companion object {
        fun fromEntity(order: OrderDetails): OrderDetailsDto {
            return OrderDetailsDto(
                id = order.id,
                category = CategoryDto.fromEntity(order.category),
                customerName = order.customerName,
                deadline = order.deadline,
                quantity = order.quantity,
                publisherName = order.publisherName
            )
        }
    }
}