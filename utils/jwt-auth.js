const jwtAuth = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401
            ctx.body = 'You do not have permission！\n'
        } else {
            throw err
        }
    })
}

module.exports = jwtAuth