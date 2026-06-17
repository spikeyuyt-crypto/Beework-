package com.example.beeworkreactverbackend.dto

import jakarta.validation.constraints.NotBlank

data class A0301VueForm(
    @field:NotBlank(message = "authority不能为空")
    var authority: String = "",
    var userMail: String? = null,
    var userName: String? = null,
    var userTel: String? = null,
)
