const App = require("../app.js");

class ProductsServices {
    #app;
    constructor() {
        this.#app = new App();
    }

    async get(params) {
        if (Object.values(params).length === 0) {
            const data = await this.#app.products.getProducts(params.category);

            if (data.status === "ERROR") {
                return { error: data.err };
            }

            return { error: null, data: data };
        }

        if (params.category != null) {
            if (params.order == "desc") {
                const data = await this.#app.products.getByCategory(
                    params.category,
                    "DESC"
                );

                if (data.status === "ERROR") {
                    return { error: data.err };
                }

                return { error: null, data: data };
            }

            const data = await this.#app.products.getByCategory(
                params.category,
                "ASC"
            );

            if (data.status === "ERROR") {
                return { error: data.err };
            }

            return { error: null, data: data };
        }

        if (params.brand != null) {
            if (params.order == "desc") {
                const data = await this.#app.products.getByBrand(
                    params.brand,
                    "DESC"
                );

                if (data.status === "ERROR") {
                    return { error: data.err };
                }

                return { error: null, data: data };
            }

            const data = await this.#app.products.getByBrand(
                params.brand,
                "ASC"
            );

            if (data.status === "ERROR") {
                return { error: data.err };
            }

            return { error: null, data: data };
        }

        return { error: "Query params not identify" };
    }

    async create(body) {
        if (
            typeof body.categories_id != "string" ||
            typeof body.brands_id != "string" ||
            typeof body.product_name != "string" ||
            typeof body.price != "number" ||
            typeof body.description != "string" ||
            typeof body.amount != "number" ||
            typeof body.image != "string"
        ) {
            return { status: 400, error: "Bad Request" };
        }

        const createProduct = await this.#app.products.createProduct(body);

        if (createProduct.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return createProduct;
    }

    async update(body) {
        const update = await this.#app.products.updateProduct(body);

        if (update.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return update;
    }

    async delete(id) {
        const del = await this.#app.products.deleteProduct(id);

        if (del.status === "ERROR") {
            return { status: 500, error: del.err };
        }

        return del;
    }
}

module.exports = new ProductsServices();
