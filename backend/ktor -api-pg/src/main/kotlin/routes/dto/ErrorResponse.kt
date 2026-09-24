package com.example.domain.exception

import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    val message: String
)