const App = require("../app.js");

class Services {
    #app;
    #db;
    constructor(_db) {
        this.#app = new App();
        this.#db = _db;
    }

    async get() {
        const data = await this.#app.orders.getOrders();

        if (data.status === "ERROR") {
            return { error: data.err };
        }

        return { error: null, data: data };
    }

    async create(body) {
        if (
            typeof body.cartOrdersId != "string" ||
            typeof body.paymentId != "string" ||
            typeof body.statusId != "string"
        ) {
            return { status: 400, error: "Bad Request" };
        }

        await this.#db.query("BEGIN");

        const createOrder = await this.#app.orders.createOrder(body);

        if (createOrder.status === "ERROR") {
            await this.#db.query("ROLLBACK");
            return { status: 500, error: createOrder.err };
        }

        await this.#db.query("COMMIT");

        return createOrder;
    }
}

module.exports = new Services();
