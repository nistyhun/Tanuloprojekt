package com.example.model.category

import kotlinx.serialization.Serializable

@Serializable
data class CategoryResponse(
    val id: Int,
    val type: String
)