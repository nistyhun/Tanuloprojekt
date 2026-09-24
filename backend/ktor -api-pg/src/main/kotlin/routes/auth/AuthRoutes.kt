package com.example.routes.auth

import com.example.domain.exception.ValidationException
import com.example.repository.user.dto.LoginRequest
import com.example.repository.user.dto.RegisterRequest
import com.example.domain.auth.AuthService
import io.ktor.http.HttpStatusCode
import io.ktor.server.auth.jwt.JWTPrincipal
import io.ktor.server.auth.principal
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post

fun Route.configureAuthRoutes(authService: AuthService) {
    post("/auth/register") {
        val request = call.receiveNullable<RegisterRequest>()
            ?: throw ValidationException("Invalid request body")

        val user = authService.register(request)

        call.respond(
            HttpStatusCode.Created,
            user
        )
    }

    post("/auth/login") {
        val request = call.receiveNullable<LoginRequest>()
            ?: throw ValidationException("Invalid request body")

        val response = authService.login(request)

        call.respond(
            HttpStatusCode.OK,
            response
        )
    }
}

fun Route.configureProtectedAuthRoutes(authService: AuthService) {
    get("/auth/me") {
        val principal = call.principal<JWTPrincipal>()
            ?: throw ValidationException("Unauthorized")

        val userId = principal.payload
            .getClaim("userId")
            .asInt()
            ?: throw ValidationException("Invalid token")

        val user = authService.getCurrentUser(userId)

        call.respond(
            HttpStatusCode.OK,
            user
        )
    }
}