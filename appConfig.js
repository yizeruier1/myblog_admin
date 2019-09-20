const host = 'mongodb+srv://gostephen:beiyi313@learnmongo-skinp.mongodb.net/user?retryWrites=true&w=majority'
const port = 3000

module.exports = {
    host: host,
    port: port,
    secriteKey: 'stephen666',
    // 前台不需要登录权限的  接口
    frontApi: ['/login', '/register', /^\/allArtical/, /^\/articalDetail/, /^\/allArticalTypes/, '/uploadImg', '/uploadEditorImg']
}