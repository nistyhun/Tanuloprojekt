package com.example.routes.category.dto

import com.example.domain.category.Category
import kotlinx.serialization.Serializable

@Serializable
data class CategoryListDto(
    val categories: List<CategoryDto>,
) {
    companion object {
        fun fromEntity(categories: List<Category>): CategoryListDto {
            return CategoryListDto(
                categories = categories.map { CategoryDto.fromEntity(it) }
            )
        }
    }
}