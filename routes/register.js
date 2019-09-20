const Router = require('koa-router')
const user_list = require('../model/user_lists')
const sendResponse = require('../utils/index').sendResponse
const createMd5 = require('../utils/index').createMd5
const saveItem = require('../utils/crud').saveItem
let register = new Router()


register.post('/register', async (ctx) => {
    let { email, password } = ctx.request.body
    const selres = await user_list.find_by_email(email)
    if (selres) {
        // 用户已存在
        ctx.body = sendResponse(201, '用户已存在')
    }else{
        // 新用户 入库
        password = createMd5(password)
        const user = new user_list({
            email,
            password,
            username: name
        })
        const insertres = await saveItem(user)
        if (insertres){
            ctx.body = sendResponse(100, 'success', insertres)
        }else{
            ctx.body = sendResponse(201, insertres)
        }
    }
})

module.exports = register