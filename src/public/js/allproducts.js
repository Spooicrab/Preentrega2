const Botones = document.getElementsByClassName('AddToCart');
const socketclient = io();
let IdCarritoActual = null

for (const Boton of Botones) {
    Boton.addEventListener('click', () => {
        const productId = Boton.getAttribute('data-product-id');
        if (IdCarritoActual == null) {
            // console.log(`1idproduct: ${productId}`)
            socketclient.emit('CrearCarrito', productId);
            // console.log("El server recibe orden de crear carrito")
        } else {
            socketclient.emit('Agregar', { productId, IdCarritoActual });
        }
    });
}

// En el cliente
socketclient.on('creado', (data) => {
    // console.log(data)
    // console.log(`socket client creado data : ${data}`)
    const productId = data.productId; // Acceder al ID del producto
    const IdCarritoCreado = data.IdCarritoCreado;
    IdCarritoActual = IdCarritoCreado;
    // console.log("Recibo el carrito ya creado y mando a añadir el primer producto");
    socketclient.emit('Agregar', { productId, IdCarritoActual }); // Enviar el ID del producto
    // console.log("Se envía para ser agregado");
});
socketclient.on('Agregado', () => {
    console.log("hasta ahora todo ok")
    console.log(IdCarritoActual)
})