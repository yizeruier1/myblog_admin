const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    coverImg: {
        type: String,
        required: true
    },
    // 文章分类   Vue,React  存逗号隔开字符串
    types: {
        type: String
    },
    // 是否开启评论 1-可以    2-不可以
    comments: {
        type: Number,
        required: true
    },
    createTime: {
        type: Date,
        default: new Date()
    },
    // 浏览量
    views: {
        type: Number,
        default: 0
    },
    // 文章内容
    content: {
        type: String
    },
    //  文章作者
    author: {
        type: String,
        default: 'Stephen'
    },
    // 文章是否删除   用来标记 回收站
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    // 不要 __v
    versionKey: false
})

// 文章分页查询
articalSchema.statics.get_artical = function (param, deleted = false) {
    let pageNum = Number(param.pageNum) - 1
    let pageSize = Number(param.pageSize)
    let data = {
        total: 0,
        list: []
    }
    return new Promise((resolve, reject) => {
        // 查询数据总数
        this.find({ deleted: deleted }).countDocuments((err1, res1) => {
            if (err1) {
                reject(1000)
            } else {
                if(res1 === 0){
                    resolve([], data)
                }else{
                    this.find({ deleted: deleted }, { content: 0, comments: 0 })
                    .skip(pageNum * pageSize)
                    .limit(pageSize)
                    .sort({ '_id': -1 })
                    .exec((err, res) => {
                        if (err) {
                            reject(1000)
                        } else {
                            data.total = res1
                            data.list = res
                            resolve(data)
                        }
                    })
                }
            }
        })
    })
}

articalSchema.statics.get_artical_detail = function (id) {
    return new Promise((resolve, reject) => {
        this.findOne({ _id: id }).exec((err, res) => {
            if (err) {
                reject(1000)
            } else {
                resolve(res)
            }
        })
    })
}

module.exports = articalSchema