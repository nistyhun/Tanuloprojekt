package com.example.service

import com.example.exception.ValidationException
import com.example.model.user.LoginRequest
import com.example.model.user.LoginResponse
import com.example.model.user.RegisterRequest
import com.example.model.user.User
import com.example.model.user.UserResponse
import com.example.repository.UserRepository
import com.example.security.JwtConfig
import com.example.security.PasswordHasher

class AuthService(
    private val userRepository: UserRepository,
    private val jwtConfig: JwtConfig
) {

    fun register(request: RegisterRequest): UserResponse {
        if (request.firstName.isBlank()) {
            throw ValidationException("First name cannot be blank")
        }

        if (request.lastName.isBlank()) {
            throw ValidationException("Last name cannot be blank")
        }

        val email = request.email.trim().lowercase()

        validateEmail(email)
        validatePassword(request.password)

        if (userRepository.emailExists(request.email)) {
            throw ValidationException("Email already exists")
        }

        val roleId = userRepository.getRoleByName("USER")
            ?: throw ValidationException("Default role not found")

        val passwordHash = PasswordHasher.hash(request.password)

        val normalizedRequest = request.copy(
            firstName = request.firstName.trim(),
            lastName = request.lastName.trim(),
            email = email
        )

        val user = userRepository.createUser(
            request = normalizedRequest,
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

    fun login(request: LoginRequest): LoginResponse {
        val email = request.email.trim().lowercase()

        val user = userRepository.getUserByEmail(email)
            ?: throw ValidationException("Invalid email or password")

        val validPassword = PasswordHasher.verify(
            request.password,
            user.passwordHash
        )

        if (!validPassword) {
            throw ValidationException("Invalid email or password")
        }

        val token = jwtConfig.generateToken(
            userId = user.id,
            email = user.email,
            role = user.role
        )

        val userResponse = UserResponse(
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role,
            createdAt = user.createdAt
        )

        return LoginResponse(
            token = token,
            user = userResponse
        )
    }

    fun getCurrentUser(userId: Int): UserResponse {
        val user = userRepository.getUserById(userId)
            ?: throw ValidationException("User not found")

        return UserResponse(
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            email = user.email,
            role = user.role,
            createdAt = user.createdAt
        )
    }

    private fun validateEmail(email: String) {
        val emailRegex = Regex(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
        )

        if (!emailRegex.matches(email)) {
            throw ValidationException("Invalid email address")
        }
    }

    private fun validatePassword(password: String) {
        if (password.length < 8) {
            throw ValidationException(
                "Password must be at least 8 characters long"
            )
        }
    }
}