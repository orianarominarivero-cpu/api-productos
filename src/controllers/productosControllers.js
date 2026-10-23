const { Producto, Categoria, Proveedor } = require('../models')

const obtenerProductos = async (req, res) => {
    try{
        const productos = await Producto.findAll({
            attributes: ['id', 'nombre', 'precio', 'stock'],
            include: [
                {
                    model: Categoria,
                    as: "categoria",
                    attributes: ['nombre']
                },
                {
                    model: Proveedor,
                    as: 'proveedores',
                    attributes: ['nombre'],
                    through: { atrributes: [] }
                }
            ]
        })
        res.status(200).json(productos)

    } catch(error){
        console.error(error)
        res.status(500).json({ message: "Error al obtener los productos." })
    }
}

const obtenerProducto = async (req, res) => {
    res.status(200).json(req.producto)
}

const crearProducto = async (req, res) => {
    try {    
        const { nombre, precio, stock, categoriaId } = req.body
        
        if(categoriaId !== undefined && categoriaId !== null){
            const categoria = await Categoria.findByPk(categoriaId)

            if(!categoria){
                return res.status(404).json({message: "Categoría no encontrada."})
            }
        }
        
        const producto = await Producto.create({
            nombre,
            precio,
            stock,
            categoriaId: categoriaId ?? null,
        })
        
        res.status(201).json({
            message: "Producto creado con éxito!!",
            producto
        })

    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al crear el producto."})
    }
}

const eliminarProducto = async (req, res) => {
    try{
        const { id } = req.params
        
        await Producto.destroy({
            where: { id }
        })
        res.status(200).json({message: "Producto eliminado con éxito!!"})
    
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al eliminar el producto."})
    }
}

const agregarProveedor = async (req,res) => {
    try{
        const { id, proveedorId } = req.params
        
        const producto = await Producto.findByPk(id)
        if(!producto){
            return res.status(404).json({message: "Producto no encontrado."})
        }
        
        const proveedor = await Proveedor.findByPk(proveedorId)
        if(!proveedor){
            return res.status(404).json({message: "Proveedor no encontrado"})
        }
        
        const yaAsociado = await Producto.hasProveedor(proveedor)
        if(yaAsociado){
            return res.status(400).json({
                message: "El proveedor ya está asociado al producto"
            })
        }
        
        // Relacion
        await producto.addProveedor(proveedor)
        res.status(200).json({
            message: "Proveedor asociado al producto correctamente."
        })
        
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al asociar el proveedor."})
    }
}

const quitarProveedor = async (req, res) => {
    try{
        const { id, proveedorId } = req.params
        
        const producto = await Producto.findByPk(id)
        if(!producto){
            return res.status(404).json({message: "Producto no encontrado."})
        }

        const proveedor = await Proveedor.findByPk(proveedorId)
        if(!proveedor){
            return res.status(404).json({message: "Proveedor no encontrado."})
        }

        //Chequear si el producto y el proveedor están asociados
        const estaAsociado = await Producto.hasProveedor(proveedor)
        if(!estaAsociado){
            return res.status(404).json({message: "El proveedor no está asociado al producto"})
        }
        await producto.removeProveedor(proveedor)
        res.status(200).json({message: "Proveedor desvinculado del producto correctamente."})
    
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al desvincular el proveedor."})
    }
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    eliminarProducto,
    agregarProveedor,
    quitarProveedor
}