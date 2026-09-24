package com.example.repository.category

import com.example.repository.category.dto.CategoryResponse
import com.example.domain.category.CategoryRepository
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

class DbCategoryRepository : CategoryRepository {
    override fun getAllCategories(): List<CategoryResponse> {
        return transaction {
            CategoryTable.selectAll().map { row -> CategoryResponse(
                id = row[CategoryTable.id].value,
                type = row[CategoryTable.type]
            )}
        }
    }
}