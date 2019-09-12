const mongoose = require('mongoose')
const userSchema = require('../schema/user')
const user_list = mongoose.model('user_list', userSchema)


module.exports = user_list