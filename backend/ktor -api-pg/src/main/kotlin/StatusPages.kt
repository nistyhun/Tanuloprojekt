package com.example

import com.example.exception.CategoryNotFoundException
import com.example.exception.OrderNotFoundException
import com.example.exception.ValidationException
import com.example.model.common.ErrorResponse
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

        exception<Throwable> { call, cause ->
            call.respond(
                HttpStatusCode.InternalServerError,
                ErrorResponse("Internal server error")
            )
        }
    }
}