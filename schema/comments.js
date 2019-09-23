const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    // 文章 Id
    articalId: {
        type: String,
        required: true
    },
    // 用户 Id
    userId: {
        type: String,
        required: true
    },
    // 用户名
    userName: {
        type: String,
        required: true
    },
    // 用户头像
    userAva: {
        type: String,
        required: true
    },
    // 点赞数量
    coolNum: {
        type: Number,
        default: 0
    },
    // 踩
    clicks: {
        type: Number,
        default: 0
    },
    // 回复 存JSON字符串
    reply: {
        type: String,
        default: ''
    },
    createTime: {
        type: Date,
        default: new Date()
    }
}, {
    // 不要 __v
    versionKey: false
})

// 查询
commentsSchema.statics.get_comments = function (param) {
    return new Promise((resolve, reject) => {
        let pageNum = Number(param.pageNum) - 1
        let pageSize = Number(param.pageSize)
        let data = {
            total: 0,
            list: []
        }

        // 查询总条数
        this.find().countDocuments((err1, res1) => {
            if (err1) {
                reject(1000)
            } else {
                if(res1 === 0){
                    resolve([], data)
                }else{
                    this.find()
                    .skip(pageNum * pageSize)
                    .limit(pageSize)
                    .sort({ '_id': 1 })
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


module.exports = commentsSchema