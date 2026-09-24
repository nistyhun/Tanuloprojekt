package com.example.setup.database

import com.example.repository.category.CategoryTable
import com.example.repository.order.OrderTable
import com.example.repository.role.RoleTable
import com.example.repository.user.UserTable

val exposedTables = listOf(
    CategoryTable,
    OrderTable,
    RoleTable,
    UserTable
)