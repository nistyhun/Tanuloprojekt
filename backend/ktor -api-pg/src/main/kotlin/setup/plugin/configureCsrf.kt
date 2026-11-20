package com.example.setup.plugin

import io.ktor.server.application.*
import io.ktor.server.plugins.csrf.*

fun Application.configureCsrf() {
    install(CSRF) {
        allowOrigin("http://localhost:3000")
    }
}