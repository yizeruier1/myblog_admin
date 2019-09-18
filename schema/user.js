const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 建Schema    表结构
const userSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    // 性别 1-男     2-女
    gender: {
        type: Number,
        default: 0
    },
    // 个性签名
    sign: {
        type: String,
        default: ''
    },
    // 头像
    ava: {
        type: String,
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // 用户权限
    permissions: {
        type: Number,
        default: 1
    },
    createTime: {
        type: Date,
        default: new Date()
    }
}, {
    // 不要 __v
    versionKey: false
})

// 定义一个根据email查用户的 static 方法
// 这里 用 箭头函数 会使 this 目标丢失
userSchema.statics.find_by_email = function (email, fields = null) {
    return new Promise((resolve, reject) => {
        this.findOne({
            email: email
        }, fields, (err, res) => {
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


module.exports = userSchema