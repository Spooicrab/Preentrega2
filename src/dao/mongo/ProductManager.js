import { response } from "express";
import { ProductoModel } from "../models/Product.model.js";

class ProductsManager {
    // 
    async GetAll(obj) {
        const { limit = 10, page = 1, sort: sortPrice, ...query } = obj
        const response = await ProductoModel.paginate(query, {
            limit,
            page,
            sort: { price: sortPrice === 'asc' ? -1 : 1 },
            lean: true
        })
        return response;
    }
    async Render() {
        response = await ProductoModel.find().lean()
        return response
    }
    // 
    async GetById(id) {
        const response = await ProductoModel.findById(id);
        return response;
    }
    // 
    async Add(obj) {
        const response = await ProductoModel.create(obj)
        return response;
    }
    // 
    async Delete(id) {
        const response = await ProductoModel.findByIdAndDelete(id)
        return response;
    }
    // 
    async Update(id, obj) {
        const response = await ProductManager.GetById(id)
        try {
            response.title = obj.title
            response.description = obj.description
            response.price = obj.price
            response.thumbnail = obj.thumbnail
            response.code = obj.code
            response.stock = obj.stock
            const Actualizado = response.save()
            return Actualizado
        } catch (error) { throw error }
    }
}

export const ProductManager = new ProductsManager;