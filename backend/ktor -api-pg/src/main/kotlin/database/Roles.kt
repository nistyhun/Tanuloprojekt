package com.example.database

import org.jetbrains.exposed.v1.core.Table

object Roles : Table("roles") {
    val id = integer("id").autoIncrement()
    val role = varchar("role", 20).uniqueIndex()

    override val primaryKey = PrimaryKey(id)
}