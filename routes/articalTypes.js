const Router = require('koa-router')
const artical_types = require('../model/artical_types')
const utils = require('../utils/index')
const saveItem = require('../utils/crud').saveItem
let articalTypes = new Router()

// 删除所有匹配记录
const deleteItem = (param) => {
    return new Promise((resolve, reject) => {
        artical_types.deleteMany(param, (err) => {
            try {
                if (err) {
                    // 1000 查询出错
                    reject(1000)
                } else {
                    resolve(100)
                }
            } catch (error) {
                console.log(error)
                reject(1000)
            }
        })
    })
}

// 根据id更新一条记录
const updateItem = (id, param) => {
    return new Promise((resolve, reject) => {
        artical_types.findByIdAndUpdate(id, param, { useFindAndModify: false }, (err, res) => {
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

// 查询 文章分类
articalTypes.get('/allArticalTypes', async (ctx) => {
    let param = {
        pageSize: ctx.query.pageSize,
        pageNum: ctx.query.pageNum
    }
    if (!ctx.query.pageSize){
        param.pageSize = 10
    }
    if (!ctx.query.pageNum) {
        param.pageNum = 1
    }
    const types = await artical_types.find_all(param)
    if(types){
        ctx.body = utils.sendResponse(100, 'success', types)
    }else{
        ctx.body = utils.sendResponse(201, '系统故障', types)
    }
})

// 新增文章分类
articalTypes.post('/addArticalTypes', async (ctx) => {
    let { key, value } = ctx.request.body
    if(!key || !value){
        ctx.body = utils.sendResponse(201, '缺少参数')
    }else{
        const type = new artical_types({
            key,
            value
        })
        const res = await saveItem(type)
        if(res){
            ctx.body = utils.sendResponse(100, '插入成功', res)
        }else{
            ctx.body = utils.sendResponse(201, '插入失败', res)
        }
    }
})

// 删除文章分类
articalTypes.delete('/deleteArticalTypes', async (ctx) => {
    const res = await deleteItem(ctx.query)
    if(res === 100){
        ctx.body = utils.sendResponse(100, '删除成功')
    }else{
        ctx.body = utils.sendResponse(201, '删除失败')
    }
})

// 更新文章分类
articalTypes.post('/updateArticalTypes', async (ctx) => {
    let { _id, key, value, color } = ctx.request.body
    const res = await updateItem(_id, {
        key,
        value,
        color
    })
    if (res) {
        ctx.body = utils.sendResponse(100, '更新成功')
    } else {
        ctx.body = utils.sendResponse(201, '更新失败')
    }
})

module.exports = articalTypes