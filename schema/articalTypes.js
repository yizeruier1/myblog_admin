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

const artical_types = mongoose.model('artical_types', articalTypesSchema)

module.exports = {
    artical_types: artical_types
}