package com.example.repository.role

import com.example.repository.rest.EntityTable

object RoleTable : EntityTable("roles") {
    val role = varchar("role", 20).uniqueIndex()
}