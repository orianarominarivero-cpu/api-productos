const { Router } = require('express')
const router = Router()
const productoController = require('../controllers/productosControllers')
const validarId = require('../middlewares/validarId')
const buscarProductoPorId = require('../middlewares/buscarProductoPorId')
const validarProducto = require('../middlewares/validarProducto')

router.get('/', productoController.obtenerProductos)
router.get('/:id', validarId, buscarProductoPorId, productoController.obtenerProducto)
router.post('/', validarProducto, productoController.crearProducto)
router.delete('/:id', validarId, buscarProductoPorId, productoController.eliminarProducto)

// Rutas de la relacion muchos a muchos Producto <-> Proveedor
router.post(
    '/:id/proveedores/:proveedorId',
    validarId,
    productoController.agregarProveedor
)
router.delete(
    '/:id/proveedores/:proveedorId',
    validarId,
    productoController.quitarProveedor
)

module.exports = router