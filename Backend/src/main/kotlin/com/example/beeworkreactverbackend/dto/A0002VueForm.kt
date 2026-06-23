package com.example.beeworkreactverbackend.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class A0002VueForm(
    var authority: String = "",
    var companyId: String = "",
    @field:NotBlank(message = "phoneCountryCode不能为空")
    var phoneCountryCode: String = "",
    @field:NotBlank(message = "firstName不能为空")
    var firstName: String = "",
    @field:NotBlank(message = "firstNameKana不能为空")
    var firstNameKana: String = "",
    @field:NotBlank(message = "lastName不能为空")
    var lastName: String = "",
    @field:NotBlank(message = "lastNameKana不能为空")
    var lastNameKana: String = "",
    var userPhoto: String? = null,
    var pwd: String = "",
    var repwd: String = "",
    @field:NotBlank(message = "sex不能为空")
    var sex: String = "",
    var userId: Int? = null,
    @field:NotBlank(message = "userMail不能为空")
    @field:Email(message = "userMail格式错误")
    var userMail: String = "",
    var userStatus: String? = null,
    @field:NotBlank(message = "userTel不能为空")
    var userTel: String = "",
)
