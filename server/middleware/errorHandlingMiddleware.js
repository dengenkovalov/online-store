const ApiError = require('../error/apiErrror')

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(err.status).json({message: "Непредвиденная ошибка!"})
}
