package com.example.repository.order.dto

import com.example.setup.plugin.serialization.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class OrderResponse(
    val id: Int,
    val categoryId: Int,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
)