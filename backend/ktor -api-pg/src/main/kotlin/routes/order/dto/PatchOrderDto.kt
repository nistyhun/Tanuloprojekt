package com.example.routes.order.dto

import com.example.domain.order.PatchOrder
import com.example.setup.plugin.serialization.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class PatchOrderDto(
    val categoryId: Int? = null,
    val customerName: String? = null,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate? = null,

    val quantity: Int? = null,
    val publisherName: String? = null
) {
    fun toEntity(): PatchOrder {
        return PatchOrder(
            categoryId = categoryId,
            customerName = customerName,
            deadline = deadline,
            quantity = quantity,
            publisherName = publisherName
        )
    }
}