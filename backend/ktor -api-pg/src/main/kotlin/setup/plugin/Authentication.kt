package com.example

import com.example.routes.dto.ErrorResponse
import com.example.setup.plugin.auth.JwtConfig
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*

fun Application.configureAuthentication(jwtConfig: JwtConfig) {
    install(Authentication) {
        jwt("auth-jwt") {
            realm = jwtConfig.realm

            verifier(
                com.auth0.jwt.JWT
                    .require(jwtConfig.algorithm())
                    .withAudience(jwtConfig.audience)
                    .withIssuer(jwtConfig.issuer)
                    .build()
            )

            validate { credential ->
                val userId = credential.payload
                    .getClaim("userId")
                    .asInt()

                if (userId != null) {
                    JWTPrincipal(credential.payload)
                } else {
                    null
                }
            }

            challenge { _, _ ->
                call.respond(
                    HttpStatusCode.Unauthorized,
                    ErrorResponse("Invalid or expired token")
                )
            }
        }
    }
}