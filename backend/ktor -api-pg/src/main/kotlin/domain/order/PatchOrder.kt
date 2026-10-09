package com.example.domain.order

import java.time.LocalDate

data class PatchOrder(
    val categoryId: Int? = null,
    val customerName: String? = null,
    val deadline: LocalDate? = null,
    val quantity: Int? = null,
    val publisherName: String? = null
)