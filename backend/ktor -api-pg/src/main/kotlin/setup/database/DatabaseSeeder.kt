package com.example.database

import com.example.repository.user.UserRepository
import com.example.security.PasswordHasher
import net.datafaker.Faker
import org.jetbrains.exposed.v1.jdbc.batchInsert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import java.time.LocalDate
import kotlin.random.Random
import com.example.model.user.RegisterRequest
import com.example.repository.category.CategoriesTable
import com.example.repository.order.OrderTable
import io.ktor.server.config.ApplicationConfig

fun seedDB(userRepository:
           UserRepository,
           config: ApplicationConfig) {

    transaction {
        if (CategoriesTable.selectAll().empty()) {
            val categories = listOf(
                "könyv",
                "magazin",
                "napilap",
                "szórólap"
            )
            CategoriesTable.batchInsert(categories) { category ->
                this[CategoriesTable.type] = category
            }
        }

        if (OrderTable.selectAll().empty()) {

            val categoryIds = CategoriesTable.selectAll().map { it[CategoriesTable.id] }

            val faker = Faker()

            OrderTable.batchInsert(1..20) {
                this[OrderTable.categoryId] = categoryIds.random()
                this[OrderTable.customerName] = faker.name().fullName()
                this[OrderTable.deadline] = LocalDate.now().plusDays(Random.nextLong(1, 31))
                this[OrderTable.quantity] = Random.nextInt(1, 50)
                this[OrderTable.publisherName] = faker.name().fullName()
            }
        }
    }
    seedAdmin(userRepository, config)
}

private fun seedAdmin(
    userRepository: UserRepository,
    config: ApplicationConfig) {

    val email = config.property("ADMIN_EMAIL").getString()
        ?: return

    val password = config.property("ADMIN_PASSWORD").getString()
        ?: return

    if (userRepository.emailExists(email)) {
        return
    }

    val roleId = userRepository.getRoleByName("ADMIN")
        ?: throw IllegalStateException("ADMIN role not found")

    val passwordHash = PasswordHasher.hash(password)

    val request = RegisterRequest(
        firstName = "System",
        lastName = "Admin",
        email = email,
        password = password
    )

    userRepository.createUser(
        request = request,
        passwordHash = passwordHash,
        roleId = roleId
    )
}