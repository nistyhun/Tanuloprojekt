package com.example.domain.auth

data class RegisterUser(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)