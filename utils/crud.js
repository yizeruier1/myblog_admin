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



module.exports = {
    saveItem: saveItem
}