const Router = require('koa-router')
const comments = require('../model/comments')
const utils = require('../utils/index')
const CRUD = require('../utils/crud')
let commentsRoute = new Router()



// 新增 评论
commentsRoute.post('/addComment', async (ctx) => {
    let { articalId, content } = ctx.request.body
    let { name: userName, ava: userAva, _id: userId } = ctx.state.user
    if (!articalId || !content) {
        ctx.body = utils.sendResponse(201, '缺少参数')
    }else{
        if (!userAva) userAva = '/apis/no-ava.png'
        const item = new comments({
            articalId,
            content,
            userName,
            userAva,
            userId
        })
        const res = await CRUD.saveItem(item)
        if(res){
            ctx.body = utils.sendResponse(100, '插入成功')
        }else{
            ctx.body = utils.sendResponse(201, '插入失败')
        }
    }
})

// 查询 评论列表
commentsRoute.get('/allComments', async (ctx) => {
    const id = ctx.query.id
    let pageSize = ctx.query.pageSize || 10
    let pageNum = ctx.query.pageNum || 1
    let param = {
        pageSize,
        pageNum
    }
    const res = await comments.get_comments(param, id)
    if (res) {
        ctx.body = utils.sendResponse(100, 'success', res)
    } else {
        ctx.body = utils.sendResponse(201, '系统故障', res)
    }
})

module.exports = commentsRoute