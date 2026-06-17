package com.example.beeworkreactverbackend.dto

import com.fasterxml.jackson.annotation.JsonAlias

data class UserIDList(
    @JsonAlias("userIDList")
    var userIDs: List<String> = emptyList()
)
