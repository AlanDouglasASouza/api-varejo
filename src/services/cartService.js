const App = require("../app.js");

class CartServices {
    #app;
    constructor() {
        this.#app = new App();
    }

    async get(id) {
        const data = await this.#app.carts.getCartsByUser(id);

        if (data.status === "ERROR") {
            return { error: data.err };
        }

        return { error: null, data: data };
    }

    async create(body) {
        if (
            typeof body.userId != "string" ||
            typeof body.productId != "string" ||
            typeof body.amount != "number"
        ) {
            return { status: 400, error: "Bad Request" };
        }

        const createCart = await this.#app.carts.createCart(body);

        if (createCart.status === "ERROR") {
            return { status: 500, error: createCart.err };
        }

        return createCart;
    }

    async getQuantity(id) {
        const quantity = await this.#app.carts.quantityCardByUser(id);

        if (quantity.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return { error: null, data: quantity };
    }

    async getTotalPrice(id) {
        const quantity = await this.#app.carts.totalPriceCartUser(id);

        if (quantity.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return { error: null, data: quantity };
    }

    async delete(id) {
        const del = await this.#app.carts.deleteCart(id);

        if (del.status === "ERROR") {
            return { status: 500, error: del.err };
        }

        return del;
    }
}

module.exports = new CartServices();
