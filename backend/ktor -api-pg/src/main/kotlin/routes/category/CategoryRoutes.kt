package com.example.routes.category

import com.example.domain.category.CategoryService
import io.ktor.server.response.respond
import io.ktor.server.routing.Route
import io.ktor.server.routing.get

fun Route.configureCategoryRoutes(categoryService: CategoryService) {
    get("/categories") {
        val categories = categoryService.getAllCategories()
        call.respond(categories)
    }
}