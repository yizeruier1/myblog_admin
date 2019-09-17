const mongoose = require('mongoose')
const articalSchema = require('../schema/artical')
const articals = mongoose.model('articals', articalSchema)


module.exports = articals