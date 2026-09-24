package com.example.domain.category

import kotlinx.serialization.Serializable

@Serializable
data class CategoryResponse(
    val id: Int,
    val type: String
)