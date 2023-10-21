import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const ProductoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: Number, required: true },
    stock: { type: Number }
});

ProductoSchema.plugin(mongoosePaginate)

export const ProductoModel = mongoose.model('Products', ProductoSchema);
