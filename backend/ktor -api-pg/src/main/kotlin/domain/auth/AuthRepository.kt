package com.example.domain.auth

import com.example.domain.user.User

interface AuthRepository {
    suspend fun emailExists(email: String): Boolean

    suspend fun getRoleByName(role: String): Int?

    suspend fun getUserByEmail(email: String): User?

    suspend fun createUser(
        request: RegisterUser,
        passwordHash: String,
        roleId: Int
    ): User

    suspend fun getUserById(userId: Int): User?
}