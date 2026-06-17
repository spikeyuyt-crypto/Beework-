package com.example.beeworkreactverbackend.controller

import com.example.beeworkreactverbackend.dto.A0301VueForm
import com.example.beeworkreactverbackend.response.ResultResponse
import com.example.beeworkreactverbackend.service.AdminListService
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import com.example.beeworkreactverbackend.dto.UserIDList
import org.springframework.web.bind.annotation.PutMapping

@RestController
@RequestMapping("/adminList")
class AdminListController(
    private val adminListService: AdminListService,
) {
    @PostMapping("/search")
    fun search(@Validated @RequestBody form: A0301VueForm): ResultResponse {
        val list = adminListService.getAdminUserList(form)
        return ResultResponse.success("操作成功", mapOf("a0301Vo" to list))
    }

    @PutMapping("/userDelete")
    fun userDelete(@Validated @RequestBody userIDList: UserIDList): ResultResponse {
        val result = adminListService.userDelete(userIDList)
        return ResultResponse.success("操作成功", result)
    }
}
