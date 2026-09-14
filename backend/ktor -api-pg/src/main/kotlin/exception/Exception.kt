package com.example.exception

class ValidationException(message: String) :
    RuntimeException(message)

class OrderNotFoundException(message: String) :
    RuntimeException(message)

class CategoryNotFoundException(message: String) :
    RuntimeException(message)