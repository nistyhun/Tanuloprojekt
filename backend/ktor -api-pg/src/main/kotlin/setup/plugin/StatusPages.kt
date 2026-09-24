package com.example.setup.plugin

import com.example.domain.exception.CategoryNotFoundException
import com.example.domain.exception.ForbiddenException
import com.example.domain.exception.InvalidCredentialsException
import com.example.domain.exception.OrderNotFoundException
import com.example.domain.exception.ValidationException
import com.example.routes.dto.ErrorResponse
import io.ktor.server.response.*
import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.plugins.BadRequestException
import io.ktor.server.plugins.statuspages.StatusPages

fun Application.configureStatusPages() {
    install(StatusPages) {

        exception<ValidationException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse(cause.message ?: "Invalid data")
            )
        }

        exception<OrderNotFoundException> { call, cause ->
            call.respond(
                HttpStatusCode.NotFound,
                ErrorResponse(cause.message ?: "Order not found")
            )
        }

        exception<BadRequestException> { call, cause ->
            call.respond(
                HttpStatusCode.BadRequest,
                ErrorResponse("Invalid request body")
            )
        }

        exception<CategoryNotFoundException> { call, cause ->
            call.application.log.error("Unhandled exception", cause)

            call.respond(
                HttpStatusCode.NotFound,
                ErrorResponse(cause.message ?: "Category not found")
            )
        }

        exception<ForbiddenException> { call, cause ->
            call.respond(
                HttpStatusCode.Forbidden,
                ErrorResponse(cause.message ?: "Forbidden")
            )
        }

        exception<Throwable> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ErrorResponse("Internal server error")
            )
        }

        exception<InvalidCredentialsException> { call, cause ->
            call.respond(
                HttpStatusCode.Unauthorized,
                mapOf("message" to cause.message)
            )
        }
    }
}