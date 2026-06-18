package com.example.beeworkreactverbackend.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.RequestBody
import com.example.beeworkreactverbackend.dto.A0002VueForm
import com.example.beeworkreactverbackend.response.CommonResult
import com.example.beeworkreactverbackend.service.AdminSystemRegisterService
import com.example.beeworkreactverbackend.entity.UserTblEntity


@RestController
@RequestMapping("/adminList")
class UserLoginController(
    private val adminSystemRegisterService: AdminSystemRegisterService
) {
    @PostMapping("/auserSystemInsert")
    fun login(@Validated @RequestBody userEntity: A0002VueForm): CommonResult {
        val userTblEntity = UserTblEntity(
            userCd = userEntity.userId,
            pwd = userEntity.pwd,
            companyId = userEntity.companyId,
            authority = userEntity.authority,
            firstNameKana = userEntity.firstNameKana,
            lastName = userEntity.lastName,
            lastNameKana = userEntity.lastNameKana,
            firstName = userEntity.firstName,
            countryZip = userEntity.phoneCountryCode,
            userMail = userEntity.userMail,
            userTel = userEntity.userTel,
            sex = userEntity.sex,
            userStatus = userEntity.userStatus,
            photoAddress = userEntity.userPhoto
            )
        adminSystemRegisterService.insertUserInto(userTblEntity)
        return CommonResult.success("操作成功", null)
    }
}
