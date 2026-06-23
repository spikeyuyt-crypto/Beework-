package com.example.beeworkreactverbackend.exception

import com.example.beeworkreactverbackend.response.CommonResult
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationException(e: MethodArgumentNotValidException): CommonResult {
        val message = e.bindingResult.fieldErrors.firstOrNull()?.defaultMessage ?: "参数错误"
        return CommonResult.parameterFailed(message)
    }

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleUnreadableMessageException(e: HttpMessageNotReadableException): CommonResult =
        CommonResult.parameterFailed("请求参数格式错误")

    @ExceptionHandler(Exception::class)
    fun handleException(e: Exception): CommonResult =
        CommonResult.failed(500, "系统错误")
}
