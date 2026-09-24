package com.example.repository.category.dto

import kotlinx.serialization.Serializable

@Serializable
data class CategoryResponse(
    val id: Int,
    val type: String
)