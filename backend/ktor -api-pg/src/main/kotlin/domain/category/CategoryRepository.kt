package com.example.service.category

interface CategoryRepository {
    fun getAllCategories(): List<CategoryResponse>
}