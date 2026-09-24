package com.example.repository.user.dto

import com.example.setup.plugin.serialization.LocalDateTimeSerializer
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class UserResponse(
    val id: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val role: String,

    @Serializable(with = LocalDateTimeSerializer::class)
    val createdAt: LocalDateTime
)