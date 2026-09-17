package com.example.repository

import com.example.database.Categories
import com.example.model.category.CategoryResponse
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

class CategoryRepository {
    fun getAllCategories(): List<CategoryResponse> {
        return transaction {
            Categories.selectAll().map {row -> CategoryResponse(
                id = row[Categories.id],
                type = row[Categories.type]
            )}
        }
    }
}