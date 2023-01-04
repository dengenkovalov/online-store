const {Type} = require('../models/models')
const ApiError = require('../error/apiErrror')

class TypeController {
    async create(req, res) {
        const {name, item} = req.body
        const type = await Type.create({name, item})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll()        
        return res.json(types)
    }
}

module.exports = new TypeController()