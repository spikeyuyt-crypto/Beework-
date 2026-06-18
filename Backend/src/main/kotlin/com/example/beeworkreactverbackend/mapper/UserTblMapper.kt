package com.example.beeworkreactverbackend.mapper

import com.example.beeworkreactverbackend.dto.A0301VueForm
import com.example.beeworkreactverbackend.entity.UserTblEntity
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param
import com.example.beeworkreactverbackend.dto.A0002VueForm

@Mapper
interface UserTblMapper {
    fun getAdminUserList(@Param("form") form: A0301VueForm): List<UserTblEntity>
    fun userDelete(@Param("userIDs") userIDs: String): Int
    fun insertUserInto(@Param("userEntity") userEntity: UserTblEntity): Int
    fun getUserInfo(@Param("userId") userId: String): UserTblEntity
    fun editUserInfo(@Param("a0002VueForm") form: A0002VueForm): Int
}
