const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 建Schema    表结构
const articalTypesSchema = new Schema({
    key: Number,
    value: String
}, {
    // 不要 __v
    versionKey: false
})

// 分页查询
articalTypesSchema.statics.find_all = function (param) {
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

module.exports = articalTypesSchema