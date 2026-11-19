package com.example.routes.auth

import com.example.domain.exception.ValidationException
import com.example.routes.auth.dto.RegisterDto
import com.example.domain.auth.AuthService
import io.ktor.http.HttpStatusCode
import io.ktor.server.auth.jwt.JWTPrincipal
import io.ktor.server.auth.principal
import io.ktor.server.request.receiveNullable
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get
import io.ktor.server.routing.post
import com.example.routes.auth.dto.LoginDto
import com.example.routes.auth.dto.LoginResponseDto
import com.example.routes.auth.dto.UserDto
import io.ktor.http.Cookie

fun Route.configureAuthRoutes(authService: AuthService) {
    post("/auth/register") {
        val request = call.receiveNullable<RegisterDto>()
            ?: throw ValidationException("Invalid request body")

        val user = authService.register(request.toEntity())

        call.respond(
            HttpStatusCode.Created,
            UserDto.fromEntity(user)
        )
    }

    post("/auth/login") {
        val request = call.receiveNullable<LoginDto>()
            ?: throw ValidationException("Invalid request body")

        val result = authService.login(request.toEntity())

        call.response.cookies.append(
            Cookie(
                name = "access_token",
                value = result.token,
                httpOnly = true,
                secure = false,
                path = "/",
                maxAge = 60 * 60,
                extensions = mapOf("SameSite" to "Lax")
            )
        )

        call.respond(
            HttpStatusCode.OK,
            LoginResponseDto.fromEntity(result)
        )
    }

    post("/auth/logout") {
        call.response.cookies.append(
            Cookie(
                name = "access_token",
                value = "",
                httpOnly = true,
                secure = false,
                path = "/",
                maxAge = 0,
                extensions = mapOf("SameSite" to "Lax")
            )
        )

        call.respond(HttpStatusCode.NoContent)
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
            UserDto.fromEntity(user)
        )
    }
}