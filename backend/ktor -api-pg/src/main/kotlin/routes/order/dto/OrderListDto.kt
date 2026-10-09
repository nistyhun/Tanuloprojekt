package com.example.routes.order.dto

import com.example.domain.order.Order
import kotlinx.serialization.Serializable

@Serializable
data class OrderListDto(
    val orders: List<OrderDto>
) {
    companion object {
        fun fromEntity(orders: List<Order>): OrderListDto {
            return OrderListDto(
                orders = orders.map { OrderDto.fromEntity(it) }
            )
        }
    }
}