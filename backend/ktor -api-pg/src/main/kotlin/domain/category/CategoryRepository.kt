package com.example.domain.category

import com.example.repository.category.dto.CategoryResponse

interface CategoryRepository {
    fun getAllCategories(): List<CategoryResponse>
}