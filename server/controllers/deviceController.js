const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Brand, Type} = require('../models/models')
const ApiError = require('../error/apiErrror')

class DeviceController {
    async create(req, res) {
        let {name, price, brandId, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const device = await Device.create({name, price, brandId, typeId, img: fileName})

        if (info) {
            info = JSON.parse(info)
            info.forEach(element => {
                DeviceInfo.create({
                    title: element.title,
                    description: element.description,
                    deviceId: device.id
                })
            });
        }
        return res.json(device)
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        limit = limit || 9
        page = page || 1
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset, include: [Brand, Type]})
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset, include: [Brand, Type]})
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset, include: [Brand, Type]})
        }

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset, include: [Brand, Type]})
        }

        console.log(JSON.stringify(devices))
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },

        )
        return res.json(device)
    }
}

module.exports = new DeviceController()