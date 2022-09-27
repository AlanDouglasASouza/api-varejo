class Orders {
    #db;

    constructor(_db) {
        this.#db = _db;
    }

    async getOrders() {
        try {
            const client = await this.#db;
            const res = await client.query(
                `
                SELECT * FROM varejo.orders o
                LEFT JOIN varejo.carts c
                ON c.cart_orders_id = o.cart_orders_id
				LEFT JOIN varejo.products p
				ON p.id = c.products_id;
                `
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createOrder(data) {
        try {
            const client = await this.#db;
            const sql =
                "INSERT INTO varejo.orders (cart_orders_id, payment_id, status_id) VALUES ($1,$2,$3);";
            const values = [data.cartOrdersId, data.paymentId, data.statusId];

            const order = await client.query(sql, values);

            const updateCart = await client.query(
                `
                UPDATE varejo.carts SET status_id = $1, selected = $2 
                WHERE cart_orders_id = $3;
                `,
                ["Em aprovação", false, data.cartOrderId]
            );

            return { status: 200, error: null, id: order.rows[0].id };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Orders;
