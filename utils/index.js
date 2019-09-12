const crypto = require('crypto')

// 加密密码 -> md5
const createMd5 = password => {
    return crypto.createHash('md5').update(password).digest('hex')
}
// 验证密码 是否一样
const validatMd5 = (password, md5) => {
    const pass = crypto.createHash('md5').update(password).digest('hex')
    return pass === md5
}

// 封装回复对象  100 -> 成功      201 -> 处理错误
const sendResponse = (code = 100, message = 'success', data = null) => {
    const res = {
        code,
        message,
        data
    }
    return res
}

module.exports = {
    createMd5: createMd5,
    validatMd5: validatMd5,
    sendResponse: sendResponse
}