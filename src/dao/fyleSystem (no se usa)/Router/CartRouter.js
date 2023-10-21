import { Router } from "express";
import { CartManager } from "../CartManager.js";
const router = Router()

router.get("/", async (req, res) => {

    try {
        const Carts = await CartManager.GetCarts()
        res.status(200).json(Carts)
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get("/:cid", async (req, res) => {

    const { cid } = req.params
    try {
        const Cart = await CartManager.GetCartByid(+cid)
        return Cart ? res.status(200).json(Cart) : res.status(400).json({ message: "Id no encontrado" })
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.post("/", async (req, res) => {

    try {
        const CarritoNuevo = await CartManager.AddCart();
        res.status(200).json({ message: "Carrito creado" })
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    const IdCarrito = parseInt(req.params.cid);
    const IdProductoAñadido = parseInt(req.params.pid);
    try {
        const Añadido = await CartManager.UpdateCart(IdCarrito, IdProductoAñadido);
        res.status(200).json({ message: "Añadido", Añadido });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router
