package com.example.beeworkreactverbackend.service

import org.springframework.stereotype.Service
import com.example.beeworkreactverbackend.entity.UserTblEntity
import com.example.beeworkreactverbackend.mapper.UserTblMapper

@Service
class AdminSystemRegisterService(
    private val userTblMapper: UserTblMapper
) {
    fun insertUserInto(userEntity: UserTblEntity): Int {
        return userTblMapper.insertUserInto(userEntity)
    }
}