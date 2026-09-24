package com.example.repository.rest

import org.jetbrains.exposed.v1.core.statements.UpdateBuilder
import java.time.LocalDateTime

abstract class DbRestRepository(
    protected val table: EntityTable
){
    protected fun currentTime(): LocalDateTime =
        LocalDateTime.now()

    protected fun setCreatedTimestamps(
        statement: UpdateBuilder<*>
    ){
        val now = currentTime()

        statement[table.createdAt] = now
        statement[table.updatedAt] = now
    }

    protected fun setUpdatedTimestamps(
        statement: UpdateBuilder<*>
    ){
        statement[table.updatedAt] = currentTime()
    }
}