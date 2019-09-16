const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
let uploadImg = new Router()

// 处理文件
const dealFile = file => {
    return new Promise((resolve, reject) => {
        const reader = fs.createReadStream(file.path)
        // 修改文件的名称
        var myDate = new Date()
        var newFilename = myDate.getTime() + '.' + file.name.split('.')[1]
        var targetPath = path.join(__dirname, '../static/') + `/${newFilename}`
        console.log(targetPath)
        //创建可写流
        const upStream = fs.createWriteStream(targetPath)
        // 可读流通过管道写入可写流
        reader.pipe(upStream)
        resolve(newFilename)
    })
}



uploadImg.post('/uploadImg', async (ctx) => {
    const file = ctx.request.files.file
    if(file){
        const res = await dealFile(file)
        //返回保存的路径
        ctx.body = {
            code: 200,
            message: 'success',
            data: 'http://' + ctx.headers.host + '/static/' + res
        }
    }else{
        ctx.body = '参数错误'
    }
})

module.exports = uploadImg