package com.example.repository

import com.example.database.Roles
import com.example.database.Users
import com.example.model.user.RegisterRequest
import com.example.model.user.User
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

class UserRepository {

    fun emailExists(email: String): Boolean {
        return transaction {
            Users
                .selectAll()
                .where { Users.email eq email }
                .count() > 0
        }
    }

    fun getRoleByName(role: String): Int? {
        return transaction {
            val result = Roles
                .selectAll()
                .where { Roles.role eq role }
                .singleOrNull()

            result?.get(Roles.id)
        }
    }

    fun getUserByEmail(email: String): User? {
        return transaction {
            val user = (Users innerJoin Roles)
                .selectAll()
                .where { Users.email eq email }
                .singleOrNull()

            if (user == null) {
                return@transaction null
            }

            User(
                id = user[Users.id],
                firstName = user[Users.firstName],
                lastName = user[Users.lastName],
                email = user[Users.email],
                passwordHash = user[Users.passwordHash],
                role = user[Roles.role],
                createdAt = user[Users.createdAt]
            )
        }
    }

    fun createUser(
        request: RegisterRequest,
        passwordHash: String,
        roleId: Int
    ): User {
        return transaction {

            val newUser = Users.insert {
                it[firstName] = request.firstName.trim()
                it[lastName] = request.lastName.trim()
                it[email] = request.email.trim()
                it[Users.passwordHash] = passwordHash
                it[Users.roleId] = roleId
            }

            val userId = newUser[Users.id]

            val user = (Users innerJoin Roles)
                .selectAll()
                .where { Users.id eq userId }
                .single()

            User(
                id = user[Users.id],
                firstName = user[Users.firstName],
                lastName = user[Users.lastName],
                email = user[Users.email],
                passwordHash = user[Users.passwordHash],
                role = user[Roles.role],
                createdAt = user[Users.createdAt]
            )
        }
    }
}