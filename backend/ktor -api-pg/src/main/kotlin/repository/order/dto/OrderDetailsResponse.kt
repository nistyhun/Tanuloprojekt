package com.example.domain.order

import com.example.model.common.LocalDateSerializer
import com.example.domain.category.CategoryResponse
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