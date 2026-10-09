package com.example.domain.auth

import com.example.domain.exception.InvalidCredentialsException
import com.example.domain.exception.ValidationException
import com.example.domain.user.User
import com.example.setup.plugin.auth.JwtConfig

class AuthService(
    private val authRepository: AuthRepository,
    private val jwtConfig: JwtConfig
) {

    suspend fun register(request: RegisterUser): User {
        if (request.firstName.isBlank()) {
            throw ValidationException("First name cannot be blank")
        }

        if (request.lastName.isBlank()) {
            throw ValidationException("Last name cannot be blank")
        }

        val email = request.email.trim().lowercase()

        validateEmail(email)
        validatePassword(request.password)

        if (authRepository.emailExists(email)) {
            throw ValidationException("Email already exists")
        }

        val roleId = authRepository.getRoleByName("USER")
            ?: throw ValidationException("Default role not found")

        val passwordHash = PasswordHasher.hash(request.password)

        val normalizedRequest = request.copy(
            firstName = request.firstName.trim(),
            lastName = request.lastName.trim(),
            email = email
        )

        val user = authRepository.createUser(
            request = normalizedRequest,
            passwordHash = passwordHash,
            roleId = roleId
        )

        return user
    }

    suspend fun login(request: LoginUser): LoginResult {
        val email = request.email.trim().lowercase()

        val user = authRepository.getUserByEmail(email)
            ?: throw InvalidCredentialsException("Invalid email or password")

        val validPassword = PasswordHasher.verify(
            request.password,
            user.passwordHash
        )

        if (!validPassword) {
            throw InvalidCredentialsException("Invalid email or password")
        }

        val token = jwtConfig.generateToken(
            userId = user.id,
            email = user.email,
            role = user.role
        )

        return LoginResult(
            token = token,
            user = user
        )
    }

    suspend fun getCurrentUser(userId: Int): User {
        return authRepository.getUserById(userId)
            ?: throw ValidationException("User not found")
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