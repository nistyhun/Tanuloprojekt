package com.example.database

import org.jetbrains.exposed.v1.core.Table

object Categories : Table("categories") {
    val id = integer("id").autoIncrement()
    val type = varchar("type", 255)

    override val primaryKey = PrimaryKey(id)
}