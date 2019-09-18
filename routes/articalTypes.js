const Router = require('koa-router')
const artical_types = require('../model/artical_types')
const utils = require('../utils/index')
const CRUD = require('../utils/crud')
let articalTypes = new Router()

// 查询 文章分类
articalTypes.get('/allArticalTypes', async (ctx) => {
    let pageSize = ctx.query.pageSize || 10
    let pageNum = ctx.query.pageNum || 1
    let param = {
        pageSize,
        pageNum
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
    let { key, value, color } = ctx.request.body
    if(!key || !value || !color){
        ctx.body = utils.sendResponse(201, '缺少参数')
    }else{
        const type = new artical_types({
            key,
            value,
            color
        })
        const res = await CRUD.saveItem(type)
        if(res){
            ctx.body = utils.sendResponse(100, '插入成功', res)
        }else{
            ctx.body = utils.sendResponse(201, '插入失败', res)
        }
    }
})

// 删除文章分类
articalTypes.delete('/deleteArticalTypes', async (ctx) => {
    const res = await CRUD.deleteItem(artical_types, ctx.query)
    if(res === 100){
        ctx.body = utils.sendResponse(100, '删除成功')
    }else{
        ctx.body = utils.sendResponse(201, '删除失败')
    }
})

// 更新文章分类
articalTypes.post('/updateArticalTypes', async (ctx) => {
    let { _id, key, value, color } = ctx.request.body
    const res = await CRUD.updateItem(artical_types, _id, {
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