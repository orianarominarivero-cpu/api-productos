const validarId = (req, res, next) => {
    const { id } = req.params
    const idNumero = Number(id)
    if(!Number.isInteger(idNumero) || idNumero < 0){
        return res.status(400).json({message: "El id debe ser un número entero positivo."})
    }
    next()
}

module.exports = validarId