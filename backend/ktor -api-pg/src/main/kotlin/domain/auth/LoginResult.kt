package com.example.domain.auth

import com.example.domain.user.User

data class LoginResult(
    val token: String,
    val user: User
)