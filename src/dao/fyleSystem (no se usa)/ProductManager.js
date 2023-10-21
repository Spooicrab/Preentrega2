import fs from "fs";

class GestorProductos {
    constructor(path) {
        this.path = path;
    }

    async getProducts(Query) {
        const { limit } = Query ? Query : 10
        try {
            const productsFile = await fs.promises.readFile(this.path, "utf-8");
            const productsArray = JSON.parse(productsFile);
            return fs.existsSync(this.path) ? (limit ? productsArray.slice(0, limit) : productsArray) : [];
        }
        catch (error) {
            return error;
        }
    }

    async getProductbyID(ID) {
        try {
            const Productos = await this.getProducts({});
            const producto = Productos.find((p) => p.id === +ID);
            return producto
        } catch (error) {
            return error;
        }
    }

    async Update(ID, obj) {
        try {
            const Productos = await this.getProducts({})
            const i = Productos.findIndex((p) => p.id === ID)
            if (!i === -1) {
                return -1
            }
            const Producto = Productos[i]
            Productos[i] = { ...Producto, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(Productos))
            return 1
        } catch (error) {
            return error
        }
    }

    async delete(ID) {
        try {
            const Lista = await this.getProducts({});
            const Eliminado = Lista.find((p) => p.id === ID);
            const NuevaLista = Eliminado ? Lista.filter((p) => p.id !== ID) : null;
            await fs.promises.writeFile(this.path, JSON.stringify(NuevaLista));
            return Eliminado ? 1 : -1;
        } catch (error) {
            return error;
        }
    }


    async AddProduct(obj) {
        try {
            const Productos = await this.getProducts()
            let id
            id = Productos.length ? Productos[Productos.length - 1].id + 1 : 1
            const ProductoNuevo = { id, ...obj }
            Productos.push(ProductoNuevo)
            await fs.promises.writeFile(this.path, JSON.stringify(Productos))
            return ProductoNuevo
        } catch (error) {
            return error
        }
    }

}



export const ProductManager = new GestorProductos("Products.json");
