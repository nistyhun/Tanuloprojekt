package com.example.repository.order.dto

import com.example.setup.plugin.serialization.LocalDateSerializer
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