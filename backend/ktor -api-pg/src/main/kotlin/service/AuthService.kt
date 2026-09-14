package com.example.service

import com.example.exception.ValidationException
import com.example.model.user.RegisterRequest
import com.example.model.user.UserResponse
import com.example.repository.UserRepository
import com.example.security.PasswordHasher

class AuthService(
    private val userRepository: UserRepository
) {

    fun register(request: RegisterRequest): UserResponse {
        if (request.firstName.isBlank()) {
            throw ValidationException("First name cannot be blank")
        }

        if (request.lastName.isBlank()) {
            throw ValidationException("Last name cannot be blank")
        }

        if (request.email.isBlank()) {
            throw ValidationException("Email cannot be blank")
        }

        if (request.password.isBlank()) {
            throw ValidationException("Password cannot be blank")
        }

        if (userRepository.emailExists(request.email)) {
            throw ValidationException("Email already exists")
        }

        val roleId = userRepository.getRoleByName("USER")
            ?: throw ValidationException("Default role not found")

        val passwordHash = PasswordHasher.hash(request.password)

        val user = userRepository.createUser(
            request = request,
            passwordHash = passwordHash,
            roleId = roleId
        )

        return UserResponse(
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role,
            createdAt = user.createdAt
        )
    }
}