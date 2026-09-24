package com.example.service

import com.example.service.category.CategoryResponse
import com.example.service.category.CategoryRepository

class CategoryService(
    private val categoryRepository: CategoryRepository
){
    fun getAllCategories(): List<CategoryResponse>{
        return categoryRepository.getAllCategories()
    }
}