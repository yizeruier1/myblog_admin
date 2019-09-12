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
    // 文字分类   1,2,3,4,5  存逗号隔开字符串    key 值
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
        default: Date.now()
    },
    // 浏览量
    views: {
        type: Number,
        default: 0
    }
}, {
    // 不要 __v
    versionKey: false
})

// 文章分页查询
articalSchema.statics.get_artical = function(param){
    param.page = param.page - 1
    return new Promise((resolve, reject) => {
        // 查询数据总数
        this.find(param).count((err, res) => {
            if(err){
                reject(1000)
            }else{
                console.log(`total ${res} items`)
                if(res > 0){
                    this.find(param).skip(param.page * param.pageSize).limit(param.pageSize).sort({ '_id': -1 }).exec((err1, res1) => {
                        if (err1) {
                            reject(1000)
                        } else {
                            resolve(res1, res)
                        }
                    })
                }
            }
        })
    })
}

module.exports = articalSchema