package com.example.domain.order

import java.time.LocalDate

data class UpdateOrder(
    val categoryId: Int,
    val customerName: String,
    val deadline: LocalDate,
    val quantity: Int,
    val publisherName: String
)