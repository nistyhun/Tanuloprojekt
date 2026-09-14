package com.example.model.order

import com.example.model.common.LocalDateSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDate

@Serializable
data class PatchOrderRequest(
    val categoryId: Int? = null,
    val customerName: String? = null,

    @Serializable(with = LocalDateSerializer::class)
    val deadline: LocalDate? = null,

    val quantity: Int? = null,
    val publisherName: String? = null

    )