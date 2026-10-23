const { Categoria, Producto } = require('../models')

const obtenerCategorias = async (req, res) => {
    try{
        const categorias = await Categoria.findAll({
            attributes: ['id', 'nombre'],
            include: {
                model: Producto,
                as: "productos",
                attributes: ['nombre']
            }
        })
        res.status(200).json(categorias)
    } catch(error){
        res.status(500).json({message: "Error al obtener las categorías."})
    }
}

const obtenerCategoria = async (req, res) => {
    try{
        const { id } = req.params
        const categoria = await Categoria.findByPk(id, {
            attributes: ['id', 'nombre'],
            include: {
                model: Producto,
                as: "productos",
                attributes: ['nombre']
            }
        })
        if(!categoria){
            return res.status(404).json({message: "Categoría no encontrada."})
        }
        res.status(200).json(categoria)
    } catch(error){
        res.status(500).json({message: "Error al obtener la categoría."})
    }
}

const crearCategoria = async (req, res) => {
    try{
        const { nombre } = req.body
        await Categoria.create({
            nombre
        })
        res.status(201).json({message: "Categoría creada con éxito!!"})
    } catch(error){
        res.status(500).json({message: "Error al crear la categoría."})
    }
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
}