const Router = require('koa-router')
const articals = require('../model/articals')
const utils = require('../utils/index')
const CRUD = require('../utils/crud')
let articalRoute = new Router()


// 查文章列表
articalRoute.get('/allArtical', async (ctx) => {
    let deleted = false
    let pageSize = ctx.query.pageSize || 10
    let pageNum = ctx.query.pageNum || 1
    let param = {
        pageSize,
        pageNum
    }
    // 查询 在回收站里的 文章
    if (ctx.query.deleted) deleted = true
    const res = await articals.get_artical(param, deleted)
    if (res) {
        ctx.body = utils.sendResponse(100, 'success', res)
    } else {
        ctx.body = utils.sendResponse(201, '系统故障', res)
    }
})

// 新增文章
articalRoute.post('/addArtical', async (ctx) => {
    let { title, types, desc, coverImg } = ctx.request.body
    if (!title || !types || !desc || !coverImg) {
        ctx.body = utils.sendResponse(201, '缺少参数')
    }else{
        ctx.request.body.comments = Number(ctx.request.body.comments)
        const item = new articals({
            ...ctx.request.body
        })
        const res = await CRUD.saveItem(item)
        if(res){
            ctx.body = utils.sendResponse(100, '插入成功')
        }else{
            ctx.body = utils.sendResponse(201, '插入失败')
        }
    }
})

// 查文章详情
articalRoute.get('/articalDetail', async (ctx) => {
    const res = await articals.get_artical_detail(ctx.query.id)
    if (res) {
        // 查询 成功 增加一个 浏览次数
        CRUD.updateItem(articals, ctx.query.id, {
            views: res.views + 1
        })
        ctx.body = utils.sendResponse(100, 'success', res)
    } else {
        ctx.body = utils.sendResponse(201, '系统故障', res)
    }
})

// 文章更新
articalRoute.post('/updateArtical', async (ctx) => {
    ctx.request.body.comments = Number(ctx.request.body.comments)
    const id = ctx.request.body.id
    const res = await CRUD.updateItem(articals, id, {
        ...ctx.request.body
    })
    if (res) {
        ctx.body = utils.sendResponse(100, '更新成功')
    } else {
        ctx.body = utils.sendResponse(201, '更新失败')
    }
})

// 删除文章
articalRoute.delete('/deleteArtical', async (ctx) => {
    const { id, deleted } = ctx.query
    const res = await CRUD.updateItem(articals, id, {
        deleted
    })
    if (res) {
        ctx.body = utils.sendResponse(100, '更新成功')
    } else {
        ctx.body = utils.sendResponse(201, '更新失败')
    }
})

module.exports = articalRoute