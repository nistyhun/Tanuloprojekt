package com.example.service

import com.example.model.category.CategoryResponse
import com.example.repository.CategoryRepository

class CategoryService(
    private val categoryRepository: CategoryRepository
){
    fun getAllCategories(): List<CategoryResponse>{
        return categoryRepository.getAllCategories()
    }
}