package com.example.routes.order.dto

import com.example.domain.order.Order
import kotlinx.serialization.Serializable

@Serializable
data class OrderListDto(
    val orders: List<OrderDto>,
    val totalCount: Long,
    val totalPages: Int,
    val currentPage: Int,
) {
    companion object {
        fun fromEntity(orders: List<Order>,
                       totalCount: Long,
                       currentPage: Int,
                       size: Int): OrderListDto {
            val totalPages = ((totalCount + size -1) / size).toInt()

            return OrderListDto(
                orders = orders.map { OrderDto.fromEntity(it) },
                totalCount = totalCount,
                totalPages = totalPages,
                currentPage = currentPage
            )
        }
    }
}