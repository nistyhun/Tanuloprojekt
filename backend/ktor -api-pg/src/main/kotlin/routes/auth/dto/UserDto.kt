package com.example.routes.auth.dto

import com.example.domain.user.User
import com.example.setup.plugin.serialization.LocalDateTimeSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class UserDto(
    val id: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String,

    @Serializable(with = LocalDateTimeSerializer::class)
    val createdAt: LocalDateTime
) {
    companion object {
        fun fromEntity(user: User): UserDto = UserDto(
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role,
            createdAt = user.createdAt
        )
    }
}