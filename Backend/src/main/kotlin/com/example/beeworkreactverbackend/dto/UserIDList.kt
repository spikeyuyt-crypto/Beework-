package com.example.beeworkreactverbackend.dto

import com.fasterxml.jackson.annotation.JsonAlias
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty

data class UserIDList(
    @JsonAlias("userIDList")
    @field:NotEmpty(message = "userIDList不能为空")
    var userIDs: List<@NotBlank(message = "userId不能为空") String> = emptyList()
)
