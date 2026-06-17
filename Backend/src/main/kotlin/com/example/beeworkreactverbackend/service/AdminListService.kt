package com.example.beeworkreactverbackend.service

import com.example.beeworkreactverbackend.dto.A0301VueForm
import com.example.beeworkreactverbackend.entity.UserTblEntity
import com.example.beeworkreactverbackend.mapper.UserTblMapper
import org.springframework.stereotype.Service
import com.example.beeworkreactverbackend.dto.UserIDList


@Service
class AdminListService(
    private val userTblMapper: UserTblMapper
) {
    fun getAdminUserList(form: A0301VueForm): List<UserTblEntity> =
        userTblMapper.getAdminUserList(form)

    fun userDelete(userIDList: UserIDList): Int {
       val userIDs = userIDList.userIDs.joinToString(
            separator = ", ",
            prefix = "(",
            postfix = ")"
        ) {
            "\"$it\""
        }
        return userTblMapper.userDelete(userIDs)
}
}
