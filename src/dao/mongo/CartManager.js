import { CartModel } from "../models/Cart.model.js";
import mongoose from "mongoose";

class CartManager {

    async GetAll() {
        const response = await CartModel.find().populate('Products.product').lean();
        return response;
    }
    // 
    async GetByID(ID) {
        const response = await CartModel.findById(ID).populate('Products.product').lean();
        return response;
    }
    // 
    async Add(obj) {
        const response = await CartModel.create(obj)
        return response;
    }
    // 
    async Delete(ID) {
        const response = await CartModel.findByIdAndDelete(ID)
        return response;
    }
    //
    async Vaciar(ID) {
        const response = await CartModel.findById(ID)
        response.Products = []
        return response.save()
    }
    //
    async Actualizar(CartID, obj) {
        const response = await CartModel.findById(CartID)
        response.Products = obj
        await response.save()
        return response
    }
    //
    async AgregarCantidad(CartID, ProductID) {
        const response = await CartModel.findById(CartID);
        if (!response) { return null }
        const ProductoIndex = response.Products.findIndex(p => p.product.equals(ProductID));
        if (ProductoIndex === -1) {
            response.Products.push({
                product: ProductID,
                Cantidad: 1
            });
        } else {
            response.Products[ProductoIndex].Cantidad += 1;
        }
        const done = await response.save();
        return done;
    }


    async DeleteProduct(CartID, ProductID) {
        const response = await CartModel.findById(CartID)
        if (!response) { return null }
        const ProductoIndex = response.Products.findIndex(p => p.product.equals(ProductID))
        response.Products.splice(ProductoIndex, 1)
        const done = await response.save()
        return done
    }
    async Sumar(CartID, ProductID) {
        const response = await CartModel.findById(CartID)
        if (!response) { return null }
        const ProductoIndex = response.Products.findIndex(p => p.product.equals(ProductID))
        response.Products[ProductoIndex].Cantidad = response.Products[ProductoIndex].Cantidad++
        const done = await response.save()
        return done
    }
    async CrearCarrito() {
        const carritoVacio = {
            Products: [],
        };
        const nuevoCarrito = await this.Add(carritoVacio);
        return nuevoCarrito._id;
    }
}
export const CartM = new CartManager;