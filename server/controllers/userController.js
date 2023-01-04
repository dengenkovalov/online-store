const ApiError = require('../error/apiErrror')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role, name) => {
    return jwt.sign(
                {id, email, role, name},
                process.env.SECRET_KEY,
                {expiresIn: '1h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, name} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password!'))
        }
        
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует!'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword, name})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role, user.name)
        return res.json({token})                    
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('Пользователь с таким email не найден!'))
            }

            const comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Неправильный пароль!'))
            }

            // TODO: Add counting basket devices
            //       and return to client to show in Basket button

            const token = generateJwt(user.id, user.email, user.role, user.name)
            return res.json({token})
        } catch (error) {
            return next(ApiError.internalError('Неправильный запрос!'))
        }
                    
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
        return res.json({token})                    
    }
}

module.exports = new UserController()