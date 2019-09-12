const Router = require('koa-router')
const user_list = require('../model/user_lists')
const sendResponse = require('../utils/index').sendResponse
const createMd5 = require('../utils/index').createMd5
let register = new Router()

// 用户 入库
const saveUser = user => {
    return new Promise((resolve, reject) => {
        user.save((err, res) => {
            try {
                if (err) {
                    // 1000 查询出错
                    reject(1000)
                } else {
                    resolve(res)
                }
            } catch (error) {
                console.log(error)
                reject(1000)
            }
        })
    })
}

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
            password
        })
        const insertres = await saveUser(user)
        if (insertres){
            ctx.body = sendResponse(100, 'success', insertres)
        }else{
            ctx.body = sendResponse(201, insertres)
        }
    }
})

module.exports = register