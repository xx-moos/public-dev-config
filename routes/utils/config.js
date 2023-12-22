/** 成功返回 */
exports.successBody = (data, code = 200, msg = "success") => ({
    data,
    code,
    msg,
});

/** 错误返回 */
exports.errorBody = (code = 500, data = null, msg = "error") => ({
    data,
    code,
    msg,
});
