// 新增数据
const saveItem = item => {
    return new Promise((resolve, reject) => {
        item.save((err, res) => {
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

// 删除所有匹配记录
const deleteItem = (model, param) => {
    return new Promise((resolve, reject) => {
        model.deleteMany(param, (err) => {
            try {
                if (err) {
                    // 1000 查询出错
                    reject(1000)
                } else {
                    resolve(100)
                }
            } catch (error) {
                console.log(error)
                reject(1000)
            }
        })
    })
}

// 根据id更新一条记录
const updateItem = (model, id, param) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(id, param, { useFindAndModify: false }, (err, res) => {
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


module.exports = {
    saveItem: saveItem,
    deleteItem: deleteItem,
    updateItem: updateItem
}