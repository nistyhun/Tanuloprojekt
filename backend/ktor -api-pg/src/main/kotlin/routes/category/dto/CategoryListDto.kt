package com.example.routes.category.dto

import com.example.domain.category.Category
import kotlinx.serialization.Serializable

@Serializable
data class CategoryDto(
    val id: Int,
    val type: String,
) {
    companion object {
        fun fromEntity(category: Category): CategoryDto {
            return CategoryDto(
                id = category.id,
                type = category.type,
            )
        }
    }
}