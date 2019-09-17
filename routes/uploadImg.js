const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const sendResponse = require('../utils/index').sendResponse
let uploadImg = new Router()

const createImg = (file) => {
    return new Promise((resolve, reject) => {
        // 读取文件流
        const fileReader = fs.createReadStream(file.path)
        const filePath = path.join(__dirname, '../static/')
        // 组装成绝对路径
        const time = new Date().getTime() + '.' + file.name.split('.')[1]
        const fileResource = filePath + `/${time}`
        /*
            使用 createWriteStream 写入数据，然后使用管道流pipe拼接
        */
        const writeStream = fs.createWriteStream(fileResource)
        fileReader.pipe(writeStream)
        resolve(time)
    })
}

uploadImg.post('/uploadImg', async (ctx) => {
    const file = ctx.request.files.file
    const res = await createImg(file)
    if(res){
        ctx.body = sendResponse(100, '上传成功', res)
    }else{
        ctx.body = sendResponse(201, '上传失败')
    }
})

module.exports = uploadImg