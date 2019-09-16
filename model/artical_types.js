const mongoose = require('mongoose')
const articalTypes = require('../schema/articalTypes')
const artical_types = mongoose.model('artical_types', articalTypes)


module.exports = artical_types