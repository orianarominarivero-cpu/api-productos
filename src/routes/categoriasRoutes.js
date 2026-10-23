const { Router } = require('express')
const router = Router()
const categoriasControllers = require('../controllers/categoriasControllers')

router.get('/', categoriasControllers.obtenerCategorias)
router.get('/:id', categoriasControllers.obtenerCategoria)
router.post('/', categoriasControllers.crearCategoria)

module.exports = router