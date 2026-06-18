package com.example.beeworkreactverbackend.controller

import com.example.beeworkreactverbackend.dto.A0301VueForm
import com.example.beeworkreactverbackend.response.CommonResult
import com.example.beeworkreactverbackend.service.AdminListService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.example.beeworkreactverbackend.dto.UserIDList
import com.example.beeworkreactverbackend.dto.UserInfoRequest
import org.springframework.web.bind.annotation.PutMapping
import com.example.beeworkreactverbackend.dto.A0002VueForm

@RestController
@RequestMapping("/adminList")
class AdminListController(
    private val adminListService: AdminListService,
) {
    @PostMapping("/search")
    fun search(@Validated @RequestBody form: A0301VueForm): CommonResult {
        val list = adminListService.getAdminUserList(form)
        return CommonResult.success("操作成功", mapOf("a0301Vo" to list))
    }

    @PutMapping("/userDelete")
    fun userDelete(@Validated @RequestBody userIDList: UserIDList): CommonResult {
        val result = adminListService.userDelete(userIDList)
        return CommonResult.success("操作成功", result)
    }

    @PostMapping("/getUserInfo")
    fun getUserInfo(@Validated @RequestBody request: UserInfoRequest): CommonResult {
        val result = adminListService.getUserInfo(request.userId)
        return CommonResult.success("操作成功", mapOf("a0303Vo" to result))
    }

    @PostMapping("/userInfoUpdate")
    fun insertUserInto(@Validated @RequestBody form: A0002VueForm): CommonResult {
        val result = adminListService.editUserInfo(form)
        return CommonResult.success("操作成功", result)
    }
}
