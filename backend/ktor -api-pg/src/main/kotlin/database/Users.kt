package com.example.database

import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table
import org.jetbrains.exposed.v1.javatime.datetime

object Users : Table("users") {
    val id = integer("id").autoIncrement()
    val firstName = varchar("first_name", 50)
    val lastName = varchar("last_name", 50)
    val email = varchar("email", 255).uniqueIndex()
    val passwordHash = varchar("password_hash", 255)

    val roleId = reference(
        "role_id",
        Roles.id,
        onDelete = ReferenceOption.RESTRICT
    )

    val createdAt = datetime("created_at")

    override val primaryKey = PrimaryKey(id)
}