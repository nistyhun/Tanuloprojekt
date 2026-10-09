package com.example.domain.order

import java.time.LocalDate

data class Order(
    val id: Int,
    val categoryId: Int,
    val customerName: String,
    val deadline: LocalDate,
    val quantity: Int,
    val publisherName: String
)