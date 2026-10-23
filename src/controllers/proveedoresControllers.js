const { Proveedor, Producto } = require('../models')

const obtenerProveedores = async (req, res) => {
    try{
        const proveedores = await Proveedor.findAll({
            attributes: ['id', 'nombre']
        })
    } catch(error){
        console.error(error)
        res.status(500).json({ message: "Error al obtener los proveedores." })
    }
}

const obtenerProveedor = async (req, res) => {
    try{
        const { id } = req.params
        const proveedor = await Proveedor.findByPk(id, {
            attributes: ['id', 'nombre'],
            include: {
                model: Producto,
                as: 'Productos',
                attributes: ['id', 'nombre', 'precio', 'stock'],
                through: { attributes: []},
            }
        })

        if(!proveedor){
            return res.status(404).json({message: "Proveedor no encontrado."})
        }

        res.status(200).json(proveedor)
    } catch(error){
        console.error(error)
        res.status(500).json({message: "Error al obtener el proveedor."})
    }
}

const crearProveedor = async (req,res) => {
    try{
        const { nombre } = req.body
        if(!nombre){
            return res.status(400).json({message: "El nombre es obligatorio."})
        }
        const proveedor = await Proveedor.create({ nombre })
        res.status(201).json({
            message: "Proveedor creado con éxito!!", 
            proveedor
        })
    } catch(error){
        console.error(error)
        res.status(500).son({message: "Error al crear el proveedor."})
    }
}

module.exports = {
    obtenerProveedores,
    obtenerProveedor,
    crearProveedor
}