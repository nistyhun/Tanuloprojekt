package com.example.repository.user

import com.example.domain.auth.AuthRepository
import com.example.repository.user.dto.RegisterRequest
import com.example.domain.user.User
import com.example.repository.rest.DbRestRepository
import com.example.repository.role.RoleTable
import org.jetbrains.exposed.v1.core.eq
import org.jetbrains.exposed.v1.jdbc.insert
import org.jetbrains.exposed.v1.jdbc.selectAll
import org.jetbrains.exposed.v1.jdbc.transactions.transaction

class DbUserRepository : DbRestRepository(UserTable), AuthRepository {

    override fun emailExists(email: String): Boolean {
        return transaction {
            UserTable
                .selectAll()
                .where { UserTable.email eq email }
                .count() > 0
        }
    }

    override fun getRoleByName(role: String): Int? {
        return transaction {
            val result = RoleTable
                .selectAll()
                .where { RoleTable.role eq role }
                .singleOrNull()

            result?.get(RoleTable.id)?.value
        }
    }

    override fun getUserByEmail(email: String): User? {
        return transaction {
            val user = (UserTable innerJoin RoleTable)
                .selectAll()
                .where { UserTable.email eq email }
                .singleOrNull()

            if (user == null) {
                return@transaction null
            }

            User(
                id = user[UserTable.id].value,
                firstName = user[UserTable.firstName],
                lastName = user[UserTable.lastName],
                email = user[UserTable.email],
                passwordHash = user[UserTable.passwordHash],
                role = user[RoleTable.role],
                createdAt = user[UserTable.createdAt]
            )
        }
    }

    override fun createUser(
        request: RegisterRequest,
        passwordHash: String,
        roleId: Int
    ): User {
        return transaction {

            val newUser = UserTable.insert {
                it[firstName] = request.firstName.trim()
                it[lastName] = request.lastName.trim()
                it[email] = request.email.trim()
                it[UserTable.passwordHash] = passwordHash
                it[UserTable.roleId] = roleId

                setCreatedTimestamps(it)
            }

            val userId = newUser[UserTable.id]

            val user = (UserTable innerJoin RoleTable)
                .selectAll()
                .where { UserTable.id eq userId }
                .single()

            User(
                id = user[UserTable.id].value,
                firstName = user[UserTable.firstName],
                lastName = user[UserTable.lastName],
                email = user[UserTable.email],
                passwordHash = user[UserTable.passwordHash],
                role = user[RoleTable.role],
                createdAt = user[UserTable.createdAt]
            )
        }
    }

    override fun getUserById(userId: Int): User? {
        return transaction {
            val user = (UserTable innerJoin RoleTable)
                .selectAll()
                .where { UserTable.id eq userId }
                .singleOrNull()

            if (user == null) {
                return@transaction null
            }

            User(
                id = user[UserTable.id].value,
                firstName = user[UserTable.firstName],
                lastName = user[UserTable.lastName],
                email = user[UserTable.email],
                passwordHash = user[UserTable.passwordHash],
                role = user[RoleTable.role],
                createdAt = user[UserTable.createdAt]
            )
        }
    }
}