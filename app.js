const express = require("express");
const app = express();
const PORT =3000

app.use(express.json());


// Middleware para mostrar las solicitudes
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});




let productos = [];
// Ruta principal
app.get("/", (req, res) => {
    res.send("API de Inventario funcionando correctamente");
});

// Consultar productos
app.get("/productos", (req, res) => {
    res.json(productos);
});


 //iniciar el servidor
    app.listen(PORT, () => {
    console.log("Servidor funcionando en"+PORT);
});
   
// Registrar un producto
app.post("/productos", (req, res) => {

    const { nombre, precio, cantidad } = req.body;

    // Validar los datos
    if (!nombre || precio <= 0 || cantidad < 0) {
        return res.status(400).json({
            mensaje: "Los datos del producto no son válidos"
        });
    }

    // Crear el producto
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
    };

    // Guardar el producto
    productos.push(nuevoProducto);

    // Responder al usuario
    res.status(201).json({
        mensaje: "Producto registrado correctamente",
        producto: nuevoProducto
    });

});