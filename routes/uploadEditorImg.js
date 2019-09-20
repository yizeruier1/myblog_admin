const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
let uploadEditorImg = new Router()

const createImgs = (file) => {
    return new Promise((resolve, reject) => {
        // 读取文件流
        const fileReader = fs.createReadStream(file.path)
        const filePath = path.join(__dirname, '../static/')
        // 组装成绝对路径
        const time = new Date().getTime() + '_' + file.name
        const fileResource = filePath + `/${time}`
        /*
            使用 createWriteStream 写入数据，然后使用管道流pipe拼接
        */
        const writeStream = fs.createWriteStream(fileResource)
        fileReader.pipe(writeStream)
        resolve('/apis/' + time)
    })
}

const getImgs = async files => {
    return new Promise((resolve, reject) => {
        const imgs = Object.keys(files)
        const data = []
        imgs.forEach(async item => {
            let img = await createImgs(files[item])
            data.push(img)
            if (data.length === imgs.length) {
                resolve(data)
            }
        })
    })
}


uploadEditorImg.post('/uploadEditorImg', async (ctx) => {
    const files = ctx.request.files
    const res = await getImgs(files)
    
    if (res) {
        ctx.body = {
            errno: 0,
            data: res
        }
    } else {
        ctx.body = {
            errno: 0,
            data: []
        }
    }
})

module.exports = uploadEditorImg