package com.example.domain.category

import com.example.repository.category.dto.CategoryResponse

class CategoryService(
    private val categoryRepository: CategoryRepository
){
    fun getAllCategories(): List<CategoryResponse>{
        return categoryRepository.getAllCategories()
    }
}