package com.example.repository.user.dto

import kotlinx.serialization.Serializable

@Serializable
data class LoginResponse(
    val token: String,
    val user: UserResponse
)