const Router = require('koa-router')
const articals = require('../model/articals')
const utils = require('../utils/index')
const CRUD = require('../utils/crud')
let articalRoute = new Router()


// 查文章列表
articalRoute.get('/allArtical', async (ctx) => {
    let pageSize = ctx.query.pageSize || 10
    let pageNum = ctx.query.pageNum || 1
    let param = {
        pageSize,
        pageNum
    }
    const res = await articals.get_artical(param)
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
        ctx.body = utils.sendResponse(100, 'success', res)
    } else {
        ctx.body = utils.sendResponse(201, '系统故障', res)
    }
})

module.exports = articalRoute