import fs from 'fs'

class GestorCarrito {

    constructor(path) {
        this.path = path;
    }

    async GetCarts() {
        try {
            if (!fs.existsSync(this.path)) {
                const Carts = []
                await fs.promises.writeFile(this.path, JSON.stringify(Carts));
                return Carts
            }
            const Carts = JSON.parse(await fs.promises.readFile(this.path));
            return Carts;
        } catch (error) {
            return error;
        }
    }

    async GetCartByID(ID) {
        try {
            const Carritos = await this.GetCarts()
            const Cart = Carritos.find((c) => c.ID === ID);
            return Cart
        } catch (error) {
            return error
        }
    }

    async AddCart() {
        try {
            const Carritos = await this.GetCarts();
            let ID = Carritos.length ? Carritos[Carritos.length - 1].ID + 1 : 1;
            const NuevoCarrito = { ID, Productos: [] };
            Carritos.push(NuevoCarrito);
            await fs.promises.writeFile(this.path, JSON.stringify(Carritos));
        } catch (error) {
            return error;
        }
    }

    async UpdateCart(IDCarrito, IDProductToAdd) {
        try {
            const Carritos = await this.GetCarts();
            const CarritoModificar = Carritos.find((c) => c.ID === IDCarrito);
            const productoExistente = CarritoModificar.Productos.find(
                (p) => p.Producto === IDProductToAdd
            );
            if (productoExistente) {
                productoExistente.Quantity += 1;
            } else {
                CarritoModificar.Productos.push({
                    Producto: IDProductToAdd,
                    Quantity: 1,
                });
            }
            await fs.promises.writeFile(this.path, JSON.stringify(Carritos));
            return CarritoModificar;
        } catch (error) {
            console.log(error)
            throw new Error("Error al actualizar el carrito");
        }
    }
}
// async function test() {
//     let i = new GestorCarrito("Cart.json")
//     let prueba = await i.UpdateCart(1, 2)
//     let prueba2 = await i.UpdateCart(1, 2)
//     let prueba3 = await i.UpdateCart(1, 3)
//     console.log(prueba3)
// }
// test()
export const CartManager = new GestorCarrito("Cart.json");