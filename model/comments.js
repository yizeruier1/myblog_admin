const mongoose = require('mongoose')
const commentsSchema = require('../schema/comments')
const comments = mongoose.model('comments', commentsSchema)


module.exports = comments