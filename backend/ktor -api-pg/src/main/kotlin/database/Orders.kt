package com.example.database

import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.date

object Orders : Table("orders") {
    val id = integer("id").autoIncrement()
    val categoryId = reference("category_id",Categories.id, onDelete = ReferenceOption.RESTRICT)
    val customerName = varchar("customer_name", 50)
    val deadline = date("deadline")
    val quantity = integer("quantity")
    val publisherName = varchar("publisher_name", 50)

    override val primaryKey = PrimaryKey(id)
}