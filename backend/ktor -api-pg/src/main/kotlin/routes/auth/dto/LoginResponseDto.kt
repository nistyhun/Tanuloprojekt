package com.example.routes.auth.dto

import com.example.domain.auth.LoginResult
import kotlinx.serialization.Serializable

@Serializable
data class LoginResponseDto(
    val token: String,
    val user: UserDto
) {
    companion object {
        fun fromEntity(result: LoginResult): LoginResponseDto =
            LoginResponseDto(
                token = result.token,
                user = UserDto.fromEntity(result.user)
            )
    }
}