const express = require('express')
const app = express()
const routerProductos = require('./routes/productosRoutes')
const routerCategorias = require('./routes/categoriasRoutes')
const routerProveedores = require('./routes/proveedoresRoutes')
const db = require('./models')
const PORT = 3000

app.use(express.json())
app.use('/productos', routerProductos)
app.use('/categorias', routerCategorias)
app.use('/proveedores', routerProveedores)

app.listen(PORT, async () => {
    try{
        await db.sequelize.sync();
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    } catch(error){
        console.log("Error al sincronizar con la base de datos.", error)
    }
    
})