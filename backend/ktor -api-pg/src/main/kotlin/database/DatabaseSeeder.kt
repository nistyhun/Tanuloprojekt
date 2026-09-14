package com.example.database

import net.datafaker.Faker
import org.jetbrains.exposed.v1.jdbc.batchInsert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import java.time.LocalDate
import kotlin.random.Random

fun seedDB() {

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
}