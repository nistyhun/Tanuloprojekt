package com.example.model.common

import kotlinx.serialization.Serializable

@Serializable
data class ErrorResponse(
    val message: String
)