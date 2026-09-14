package com.example.model

import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class OrderDetailsResponse(
    val id: Int,
    val category: CategoryResponse,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
)