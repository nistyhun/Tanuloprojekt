package com.example.domain.category

interface CategoryRepository {
   suspend fun getAllCategories(): List<Category>
}