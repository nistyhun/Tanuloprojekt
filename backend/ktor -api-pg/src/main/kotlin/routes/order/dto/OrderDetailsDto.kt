package com.example.repository.order.dto

import com.example.domain.category.Category
import com.example.setup.plugin.serialization.LocalDateSerializer
import com.example.domain.category.CategoryResponse
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class OrderDetailsResponse(
    val id: Int,
    val category: Category,
    val customerName: String,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate,

    val quantity: Int,
    val publisherName: String
)