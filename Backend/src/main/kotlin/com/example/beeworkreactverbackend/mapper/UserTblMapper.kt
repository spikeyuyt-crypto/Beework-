package com.example.beeworkreactverbackend.mapper

import com.example.beeworkreactverbackend.dto.A0301VueForm
import com.example.beeworkreactverbackend.entity.UserTblEntity
import org.apache.ibatis.annotations.Mapper
import org.apache.ibatis.annotations.Param

@Mapper
interface UserTblMapper {
    fun getAdminUserList(@Param("form") form: A0301VueForm): List<UserTblEntity>
}
