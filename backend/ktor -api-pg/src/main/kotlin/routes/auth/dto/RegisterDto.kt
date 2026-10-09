package com.example.routes.auth.dto

import com.example.domain.auth.RegisterUser
import kotlinx.serialization.Serializable

@Serializable
data class RegisterDto(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
) {
    fun toEntity(): RegisterUser = RegisterUser(
        firstName = firstName,
        lastName = lastName,
        email = email,
        password = password
    )
}