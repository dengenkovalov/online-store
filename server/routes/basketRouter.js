const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/', basketController.add)
router.get('/', basketController.getAll)
router.delete('/', basketController.delete)
router.put('/', basketController.changeQuantity)

module.exports = router