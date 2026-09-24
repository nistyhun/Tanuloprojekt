package com.example.security

import com.example.domain.exception.ValidationException
import io.ktor.server.auth.principal
import io.ktor.server.auth.jwt.JWTPrincipal
import io.ktor.server.application.ApplicationCall

fun ApplicationCall.requireRole(requiredRole: String) {
    val principal = principal<JWTPrincipal>()
        ?: throw ValidationException("Unauthorized")

    val role = principal.payload
        .getClaim("role")
        .asString()

    if (role != requiredRole) {
        throw ValidationException("Forbidden")
    }
}