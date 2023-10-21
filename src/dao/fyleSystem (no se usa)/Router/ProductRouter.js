import { Router } from "express";
// import { ProductManager } from "../ProductManager.js";
// import "../src/dao/config.js"
// import { ProductoModel } from "../src/dao/models/models";
// import { ProductManager } from "../src/dao/mongo/ProductManager.js";
const router = Router()

router.get("/", async (req, res) => {
    try {
        const Productos = await ProductManager.getProducts(req.query);
        Productos.length
            ? res.status(200).json(Productos)
            : res.status(200).json({ message: "Producto No encontrado" });
    } catch (error) {
        res.status(500).json({ message: error });
    }

})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await ProductManager.getProductbyID(+id);
        return producto ? res.status(200).json(producto) : res.status(400).json({ message: "Id de Producto inexistente" });
    } catch (error) {
        res.status(500).json({ message: error });
    }

})

router.post("/", async (req, res) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({ message: "error" })
    }
    try {
        const ProductoNuevo = await ProductManager.AddProduct(req.body);
        res.status(200).json({ message: "ProductoAñadido", ProductoNuevo })
    }
    catch (error) {
        res.status(500).json({ message: error });
    }

})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const prod = await ProductManager.Update(+id, req.body);
        if (prod === -1) {
            res.status(400).json({ message: "Producto no encontrado" });
        } else {
            res.status(200).json({ message: "Actualizado" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await ProductManager.delete(+id);
        if (response === -1) {
            res.status(400).json({ message: "No encontrado" });
        } else {
            res.status(200).json({ message: "Eliminado" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

export default router