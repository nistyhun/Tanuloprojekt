package com.example.model.user

import java.time.LocalDateTime


data class User(
    val id: Int,
    val firstName: String,
    val lastName: String,
    val email: String,
    val passwordHash: String,
    val role: String,
    val createdAt: LocalDateTime
)