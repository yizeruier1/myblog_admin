const Koa = require('koa')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const koajwt = require('koa-jwt')
const Router = require('koa-router')
const koaBody = require('koa-body')
const static = require('koa-static')
const path = require('path')
const { host, port } = require('./appConfig')
const secriteKey = require('./appConfig').secriteKey
const frontApi = require('./appConfig').frontApi
const Auth = require('./utils/jwt-auth')
const app = new Koa()
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        multipart: true
    }
}))
app.use(Auth.jwtAuth).use(Auth.uncheckedImg)
app.use(koajwt({
    secret: secriteKey
}).unless({
    path: frontApi
}))
app.use(logger()).use(static(path.join(__dirname, '/static/')))

// 连接数据库
mongoose.connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('____mongoose is connected____')
})


let router = new Router()
// 引入路由
const login = require('./routes/login')
const register = require('./routes/register')
const articalTypes = require('./routes/articalTypes')
const uploadImg = require('./routes/uploadImg')
const articalRoute = require('./routes/artical')
const uploadEditorImg = require('./routes/uploadEditorImg')


// 装载所有路由
router.use(login.routes(), login.allowedMethods())
router.use(register.routes(), register.allowedMethods())
router.use(articalTypes.routes(), articalTypes.allowedMethods())
router.use(uploadImg.routes(), uploadImg.allowedMethods())
router.use(articalRoute.routes(), articalRoute.allowedMethods())
router.use(uploadEditorImg.routes(), uploadEditorImg.allowedMethods())


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(port, () => {
    console.log('application is starting at port 3000')
})