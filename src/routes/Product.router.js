import { Router } from "express";
import { ProductManager } from "../dao/mongo/ProductManager.js";
const ProductRouter = Router()

ProductRouter.get("/", async (req, res) => {
    try {
        const Productos = await ProductManager.GetAll(req.query)
        return res.status(200).json(Productos)
    } catch (error) { return res.status(400).json(error) }
})

ProductRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        const Producto = await ProductManager.GetById(pid)
        return res.status(200).json(Producto)
    } catch (error) { return res.status(400).json(error) }
})

ProductRouter.post("/", async (req, res) => {
    const { title, description, price, stock, code, thumbail, } = req.body;
    if (!title || !price || !code) { return res.status(400).json({ message: "Faltan datos" }) }
    if (!stock) { delete req.body.stock }
    try {
        const Add = await ProductManager.Add(req.body);
        res.status(200).json({ Add });
    } catch (error) { return res.status(400).json(error) }
});

ProductRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    try {
        const Producto = await ProductManager.Delete(pid)
        return res.status(200).json('Producto eliminado')
    } catch (error) { return res.status(400).json(error) }
})

ProductRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const obj = req.body
    try {
        const Producto = await ProductManager.Update(pid, obj)
        return res.status(200).json('Producto Actualizado')
    } catch (error) { return res.status(400).json(error) }
})
export default ProductRouter