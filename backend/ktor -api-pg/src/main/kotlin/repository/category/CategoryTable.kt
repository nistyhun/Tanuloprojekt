package com.example.repository.category

import com.example.repository.rest.EntityTable

object CategoriesTable : EntityTable("categories") {
    val type = varchar("type", 255)
}