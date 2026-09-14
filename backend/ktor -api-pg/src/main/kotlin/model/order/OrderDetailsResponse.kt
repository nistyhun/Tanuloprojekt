package com.example.model.order

import com.example.model.common.LocalDateSerializer
import com.example.model.category.CategoryResponse
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