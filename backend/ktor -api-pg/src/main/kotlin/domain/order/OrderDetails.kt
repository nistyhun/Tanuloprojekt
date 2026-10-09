package com.example.domain.order
import com.example.domain.category.Category
import java.time.LocalDate

data class OrderDetails(
    val id: Int,
    val category: Category,
    val customerName: String,
    val deadline: LocalDate,
    val quantity: Int,
    val publisherName: String
)