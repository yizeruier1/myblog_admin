const Router = require('koa-router')
const user_list = require('../model/user_lists')
const utils = require('../utils/index')
let login = new Router()

login.post('/login', async (ctx) => {
    let { email, password } = ctx.request.body
    if(!email || !password){
        ctx.body = utils.sendResponse(201, '输入不能为空!')
    }else{
        const selres = await user_list.find_by_email(email, 'password')
        if (!selres){
            ctx.body = utils.sendResponse(201, '用户不存在!')
        }else{
            // 验证密码
            const isPssRight = utils.validatMd5(password, selres.password)
            if (isPssRight){
                ctx.body = utils.sendResponse(100, '登录成功!')
            }else{
                ctx.body = utils.sendResponse(201, '密码错误!')
            }
        }
    }
})

module.exports = login