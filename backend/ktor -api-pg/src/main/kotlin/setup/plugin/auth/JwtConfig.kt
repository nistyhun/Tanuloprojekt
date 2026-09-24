package com.example.setup.plugin.auth

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.application.Application
import java.util.Date

class JwtConfig(application: Application) {

    private val config = application.environment.config

    private val secret =
        config.property("jwt.secret").getString()

    val issuer =
        config.property("jwt.issuer").getString()

    val audience =
        config.property("jwt.audience").getString()

    val realm =
        config.property("jwt.realm").getString()

    private val expiration =
        config.property("jwt.expiration").getString().toLong()

    private val algorithm =
        Algorithm.HMAC256(secret)

    fun generateToken(
        userId: Int,
        email: String,
        role: String
    ): String {
        return JWT.create()
            .withIssuer(issuer)
            .withAudience(audience)
            .withClaim("userId", userId)
            .withClaim("email", email)
            .withClaim("role", role)
            .withExpiresAt(
                Date(System.currentTimeMillis() + expiration)
            )
            .sign(algorithm)
    }

    fun algorithm(): Algorithm = algorithm
}