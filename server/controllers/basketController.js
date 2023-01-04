const {BasketDevice, Basket, Device, Brand} = require("../models/models");
const ApiError = require('../error/apiErrror')

class BasketController {

    async add(req, res) {
        const {userId, deviceId, devicePrice} = req.body
        const basket = await Basket.findOne({where: {userId}})
        const device = await BasketDevice.create({basketId: basket.userId, deviceId, sum: devicePrice})

        return res.json(device)
    }

    async getAll(req, res) {
        const {userId} = req.query
        const basket = await Basket.findOne({where: {userId}})
        const devices = await BasketDevice.findAndCountAll({where: {basketId: basket.userId}, include: Device})

        return res.json(devices)

    }

    async delete(req, res) {
        const {basketId, deviceId} = req.body
        let device
        if (!deviceId)
            device = await BasketDevice.destroy({where: {basketId}})
        else
            device = await BasketDevice.destroy({where: {basketId, deviceId}})

        return res.json(device)
    }

    async changeQuantity(req, res) {
        const {basketId, deviceId, quantity, sum} = req.body
        const device = await BasketDevice.update({quantity, sum}, {where: {basketId, deviceId}})

        return res.json(device)
    }
}

module.exports = new BasketController()