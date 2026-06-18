package com.example.beeworkreactverbackend.response

data class CommonResult(
    var code: Int = 0,
    var message: String? = null,
    var data: Any? = null,
) {
    companion object {
        fun success(msg: String, data: Any? = null): CommonResult =
            CommonResult(code = 200, message = msg, data = data)

        fun failed(code: Int, msg: String): CommonResult =
            CommonResult(code = code, message = msg)

        fun parameterFailed(msg: String): CommonResult =
            CommonResult(code = 404, message = msg)
    }
}
