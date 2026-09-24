package com.example.repository.user

import com.example.repository.rest.EntityTable
import com.example.repository.role.RoleTable
import org.jetbrains.exposed.v1.core.ReferenceOption

object UserTable : EntityTable("users") {
    val firstName = varchar("first_name", 50)
    val lastName = varchar("last_name", 50)
    val email = varchar("email", 255).uniqueIndex()
    val passwordHash = varchar("password_hash", 255)

    val roleId = reference(
        "role_id",
        RoleTable.id,
        onDelete = ReferenceOption.RESTRICT
    )
}