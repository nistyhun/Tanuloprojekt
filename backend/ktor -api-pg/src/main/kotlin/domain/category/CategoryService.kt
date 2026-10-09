package com.example.domain.category

class CategoryService(
    private val categoryRepository: CategoryRepository
){
    suspend fun getAllCategories(): List<Category>{
        return categoryRepository.getAllCategories()
    }
}