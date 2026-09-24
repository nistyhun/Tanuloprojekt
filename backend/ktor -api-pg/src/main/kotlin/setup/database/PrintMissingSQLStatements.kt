package com.example.setup.database

import org.jetbrains.exposed.v1.jdbc.transactions.transaction
import org.jetbrains.exposed.v1.migration.jdbc.MigrationUtils

private const val RED = "\u001b[31m"
private const val YELLOW = "\u001B[33m"
private const val RESET = "\u001b[0m"

internal fun printMissingSqlStatements() {
    transaction {
        val tables = exposedTables.toTypedArray()

        val statements = MigrationUtils.statementsRequiredForDatabaseMigration(*tables)

        if (statements.isEmpty()) {
            println("\n")
            println("${RED}the schema has not changed$RESET")
            return@transaction
        }

        val joinedStatements = statements.joinToString("\n") { "\n$YELLOW$it;$RESET\n" }

        println(joinedStatements)
    }
}

fun main() {
    val dbUrl = System.getenv("DB_URL")
    val username = System.getenv("DB_USER")
    val password = System.getenv("DB_PASSWORD")

    connectToDB(
            dbUrl = dbUrl,
            username = username,
            password = password
    )
    printMissingSqlStatements()
}