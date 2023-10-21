import mongoose from "mongoose";
const CartSchema = new mongoose.Schema({
    Products: [
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
                required: true
            },
            Cantidad: {
                type: Number,
                required: true
            }
        },
        //De aqui para abajo para tener mas de 1 en el carrito
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        },
        {
            product: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Products',
            },
            Cantidad: {
                type: Number,
            }
        }

    ]
});


export const CartModel = new mongoose.model("Cart", CartSchema);

