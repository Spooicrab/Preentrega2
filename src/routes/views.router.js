import { Router } from "express";
import { ProductManager } from "../dao/mongo/ProductManager.js";
import CartRouter from "./Cart.router.js";
import { CartM } from "../dao/mongo/CartManager.js";
const ViewsRouter = Router()

ViewsRouter.get("/products", async (req, res) => {
    let Productos = await ProductManager.GetAll(req.query)
    res.render('allproducts', ({ Productos }))
})

ViewsRouter.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await CartM.GetByID(cid)
        const Productos = cart.Products
        console.log(Productos)
        res.render('cartId', ({ Productos }))
    } catch (error) { res.status(500).json(error) }
})

ViewsRouter.post("/products", async (req, res) => {
    const { title, description, price, stock, code, thumbail, } = req.body;
    if (!title || !price || !code || !stock) {
        return res.status(400).json({ message: "Faltan datos" })
    }
    if (!stock) {
        delete req.body.stock;
    }
    try {
        const Add = await ProductManager.Add(req.body);
        res
            .status(200)
            .json({ message: "Añadido", product: Add });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default ViewsRouter