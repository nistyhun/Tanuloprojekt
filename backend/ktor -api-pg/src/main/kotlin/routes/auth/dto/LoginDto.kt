package com.example.routes.auth.dto

import com.example.domain.auth.LoginUser
import kotlinx.serialization.Serializable

@Serializable
data class LoginDto(
    val email: String,
    val password: String
) {
    fun toEntity(): LoginUser = LoginUser(
        email = email,
        password = password
    )
}