package com.example.domain.auth

import com.example.repository.user.dto.RegisterRequest
import com.example.domain.user.User

interface AuthRepository {
    fun emailExists(email: String): Boolean

    fun getRoleByName(role: String): Int?

    fun getUserByEmail(email: String): User?

    fun createUser(
        request: RegisterRequest,
        passwordHash: String,
        roleId: Int
    ): User

    fun getUserById(userId: Int): User?
}