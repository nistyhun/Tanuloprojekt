package com.example.repository.rest

import org.jetbrains.exposed.v1.core.dao.id.IntIdTable
import org.jetbrains.exposed.v1.javatime.datetime
import org.jetbrains.exposed.v1.javatime.timestamp

open class EntityTable(name: String): IntIdTable(name) {
    val updatedAt = datetime("updated_at")
    val createdAt = datetime("created_at")
    val deletedAt = datetime("deleted_at").nullable()
}