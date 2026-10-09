package com.example.repository.category

import com.example.domain.category.Category
import com.example.domain.category.CategoryRepository
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.suspendTransaction

class DbCategoryRepository : CategoryRepository {
    override suspend fun getAllCategories(): List<Category> {
        return suspendTransaction {
            CategoryTable.selectAll().map { row -> Category(
                id = row[CategoryTable.id].value,
                type = row[CategoryTable.type]
            )}
        }
    }
}