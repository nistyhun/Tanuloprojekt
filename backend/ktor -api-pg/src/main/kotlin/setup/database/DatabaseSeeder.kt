package com.example.setup.database

import com.example.repository.user.DbUserRepository
import com.example.domain.auth.PasswordHasher
import net.datafaker.Faker
import org.jetbrains.exposed.v1.jdbc.batchInsert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import java.time.LocalDate
import kotlin.random.Random
import com.example.repository.user.dto.RegisterRequest
import com.example.repository.category.CategoryTable
import com.example.repository.order.OrderTable
import java.time.LocalDateTime

fun seedDB(dbUserRepository:
           DbUserRepository,
           adminEmail: String,
           adminPassword: String) {

    transaction {

        val now = LocalDateTime.now()

        if (CategoryTable.selectAll().empty()) {
            val categories = listOf(
                "könyv",
                "magazin",
                "napilap",
                "szórólap"
            )
            CategoryTable.batchInsert(categories) { category ->
                this[CategoryTable.type] = category
                this[CategoryTable.createdAt] = now
                this[CategoryTable.updatedAt] = now
            }
        }

        if (OrderTable.selectAll().empty()) {

            val categoryIds = CategoryTable.selectAll().map { it[CategoryTable.id] }

            val faker = Faker()

            OrderTable.batchInsert(1..20) {
                this[OrderTable.categoryId] = categoryIds.random()
                this[OrderTable.customerName] = faker.name().fullName()
                this[OrderTable.deadline] = LocalDate.now().plusDays(Random.nextLong(1, 31))
                this[OrderTable.quantity] = Random.nextInt(1, 50)
                this[OrderTable.publisherName] = faker.name().fullName()
                this[OrderTable.createdAt] = now
                this[OrderTable.updatedAt] = now
            }
        }
    }
    seedAdmin(dbUserRepository, adminEmail, adminPassword)
}

private fun seedAdmin(
    dbUserRepository: DbUserRepository,
    adminEmail: String,
    adminPassword: String) {

    if (dbUserRepository.emailExists(adminEmail)) {
        return
    }

    val roleId = dbUserRepository.getRoleByName("ADMIN")
        ?: throw IllegalStateException("ADMIN role not found")

    val passwordHash = PasswordHasher.hash(adminPassword)

    val request = RegisterRequest(
        firstName = "System",
        lastName = "Admin",
        email = adminEmail,
        password = adminPassword
    )

    dbUserRepository.createUser(
        request = request,
        passwordHash = passwordHash,
        roleId = roleId
    )
}