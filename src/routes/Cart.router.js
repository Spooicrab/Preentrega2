import { Router } from "express";
import { CartM } from "../dao/mongo/CartManager.js";
const CartRouter = Router()

CartRouter.get("/", async (req, res) => {
    try {
        const Carts = await CartM.GetAll()
        return res.status(200).json(Carts)
    } catch (error) {
        return res.status(400).json(error)
    }
})

CartRouter.post("/", async (req, res) => {
    try {
        const CarritoNuevo = req.body
        const add = await CartM.Add(req.body);
        res.status(200).json({ message: 'Carrito con productos creado' })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

CartRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const Vaciar = await CartM.Vaciar(cid);
        return res.status(200).json({ message: "Carrito vaciado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

CartRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const obj = req.body
    try {
        const Actualizar = await CartM.Actualizar(cid, obj);
        return res.status(200).json({ message: "Actualizado" })
    } catch (error) { res.status(500).json({ error: error.message }) }
})

CartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid } = req.params;
        const { pid } = req.params;
        const obj = req.body
        const cantidad = obj.Cantidad
        const Actualizar = await CartM.AgregarCantidad(cid, pid, cantidad);

        /*
        Formato debe ser:
            {
              "Cantidad": 100
            }
        */
        return res.status(200).json('Actualizado')
    } catch (error) { res.status(500).json({ error: error.message }) }
})

CartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const EliminarProducto = await CartM.DeleteProduct(cid, pid)
        return res.status(200).json('Producto eliminado del Carrito')
    } catch (error) { res.status(500).json({ error: error.message }) }
})


export default CartRouter;
