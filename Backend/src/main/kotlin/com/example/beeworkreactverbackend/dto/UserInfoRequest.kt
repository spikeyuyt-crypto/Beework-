package com.example.beeworkreactverbackend.dto

import jakarta.validation.constraints.NotBlank

data class UserInfoRequest(
    @field:NotBlank(message = "userId不能为空")
    var userId: String = "",
)
