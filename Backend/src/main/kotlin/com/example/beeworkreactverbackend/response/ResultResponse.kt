package com.example.beeworkreactverbackend.response

data class ResultResponse(
    var code: Int = 0,
    var message: String? = null,
    var data: Any? = null,
) {
    companion object {
        fun success(msg: String, data: Any? = null): ResultResponse =
            ResultResponse(code = 200, message = msg, data = data)

        fun error(code: Int, msg: String): ResultResponse =
            ResultResponse(code = code, message = msg)
    }
}
