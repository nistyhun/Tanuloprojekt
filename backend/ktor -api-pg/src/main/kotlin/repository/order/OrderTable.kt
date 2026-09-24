package com.example.repository.order

import com.example.repository.category.CategoryTable
import com.example.repository.rest.EntityTable
import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.javatime.date

object OrderTable : EntityTable("orders") {
    val categoryId = reference("category_id", CategoryTable.id, onDelete = ReferenceOption.RESTRICT)
    val customerName = varchar("customer_name", 50)
    val deadline = date("deadline")
    val quantity = integer("quantity")
    val publisherName = varchar("publisher_name", 50)
}