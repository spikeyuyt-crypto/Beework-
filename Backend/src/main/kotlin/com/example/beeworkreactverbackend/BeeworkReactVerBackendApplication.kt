package com.example.beeworkreactverbackend

import org.mybatis.spring.annotation.MapperScan
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
@MapperScan("com.example.beeworkreactverbackend.mapper")
class BeeworkReactVerBackendApplication

fun main(args: Array<String>) {
    runApplication<BeeworkReactVerBackendApplication>(*args)
}
