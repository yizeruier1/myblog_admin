const fs = require('fs')
const path = require('path')

//  没有token 不能访问路由
const jwtAuth = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = 'You do not have permission！\n'
        } else {
            throw err
        }
    })
}

// 图片等静态资源  不需要token
const uncheckedImg = (ctx, next) => {
    if (ctx.url.match(/.png|.jpg|.jpeg/) && ctx.url !== '/favicon.ico') {
        const resPath = path.join(__dirname, '../static/', ctx.url)
        const fileReader = fs.createReadStream(resPath)
        ctx.type = 'image/' + ctx.url.split('.')[1]
        ctx.body = fileReader
    } else {
        return next()
    }
}

module.exports = {
    jwtAuth: jwtAuth,
    uncheckedImg: uncheckedImg
}