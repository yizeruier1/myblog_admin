const Koa = require('koa')
const mongoose = require('mongoose')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const host = require('./appConfig').host
const app = new Koa()
app.use(bodyParser())

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



// 装载所有路由
router.use(login.routes(), login.allowedMethods())
router.use(register.routes(), register.allowedMethods())



// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000, () => {
    console.log('[demo] start-quick is starting at port 3000')
})