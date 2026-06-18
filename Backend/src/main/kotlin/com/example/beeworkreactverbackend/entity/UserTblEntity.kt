package com.example.beeworkreactverbackend.entity

import com.fasterxml.jackson.annotation.JsonProperty

data class UserTblEntity(
    @get:JsonProperty("userCD")
    var userCd: Int? = null,
    var pwd: String? = null,
    var companyId: String? = null,
    var authority: String? = null,
    var firstNameKana: String? = null,
    var lastName: String? = null,
    var lastNameKana: String? = null,
    var firstName: String? = null,
    var countryZip: String? = null,
    var userMail: String? = null,
    var userTel: String? = null,
    var sex: String? = null,
    var userStatus: String? = null,
    var photoAddress: String? = null,
    var updateTime: String? = null,
)
