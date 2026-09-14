package com.example.database

import com.example.repository.UserRepository
import com.example.security.PasswordHasher
import net.datafaker.Faker
import org.jetbrains.exposed.v1.jdbc.batchInsert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import java.time.LocalDate
import kotlin.random.Random
import com.example.model.user.RegisterRequest

fun seedDB(userRepository: UserRepository) {

    transaction {
        if (Categories.selectAll().empty()) {
            val categories = listOf(
                "könyv",
                "magazin",
                "napilap",
                "szórólap"
            )
            Categories.batchInsert(categories) { category ->
                this[Categories.type] = category
            }
        }

        if (Orders.selectAll().empty()) {

            val categoryIds = Categories.selectAll().map { it[Categories.id] }

            val faker = Faker()

            Orders.batchInsert(1..20) {
                this[Orders.categoryId] = categoryIds.random()
                this[Orders.customerName] = faker.name().fullName()
                this[Orders.deadline] = LocalDate.now().plusDays(Random.nextLong(1, 31))
                this[Orders.quantity] = Random.nextInt(1, 50)
                this[Orders.publisherName] = faker.name().fullName()
            }
        }
    }
    seedAdmin(userRepository)
}

private fun seedAdmin(userRepository: UserRepository) {
    val email = System.getenv("ADMIN_EMAIL")
        ?: return

    val password = System.getenv("ADMIN_PASSWORD")
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