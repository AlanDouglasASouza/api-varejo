class Carts {
    #db;

    constructor(_db) {
        this.#db = _db;
    }

    async getCartsByUser(id) {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.carts c
                LEFT JOIN varejo.products p
                ON p.id = c.products_id WHERE c.users_id = $1 AND c.deleted = $2;`,
                [id, false]
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createCart(data) {
        try {
            const idOrder = {};
            const client = await this.#db;
            const orderId = await client.query(
                `
                SELECT cart_orders_id FROM varejo.carts WHERE users_id = $1 AND selected = $2;
            `,
                [data.userId, true]
            );

            if (orderId.rows.length < 1) {
                const date = new Date();
                const cartOrder = await client.query(
                    `
                        INSERT INTO varejo.cart_orders (created_at) VALUES ($1) RETURNING id;
                    `,
                    [date]
                );

                idOrder.id = cartOrder.rows[0].id;
            } else {
                idOrder.id = orderId.rows[0].cart_orders_id;
            }

            const sql = `INSERT INTO varejo.carts (users_id, products_id, amount, selected, status_id, cart_orders_id)
                 VALUES ($1, $2, $3, $4, $5, $6)`;
            const values = [
                data.userId,
                data.productId,
                data.amount,
                true,
                "No carrinho",
                idOrder.id,
            ];

            const user = await client.query(sql, values);

            return { status: 200, error: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async deleteCart(id) {
        try {
            const client = await this.#db;
            const sql =
                "UPDATE varejo.carts SET deleted=$1, selected=$4, deleted_at=$2 WHERE id=$3 ;";
            const dateNow = new Date();

            await client.query(sql, [true, dateNow, id, false]);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async quantityCardByUser(id) {
        try {
            const client = await this.#db;
            const sql = `SELECT SUM(amount) FROM varejo.carts 
            where users_id = $1 AND selected = $2;`;

            const data = await client.query(sql, [id, true]);

            return { status: 204, err: null, response: data.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async totalPriceCartUser(id) {
        try {
            const client = await this.#db;
            const sql = `SELECT SUM((c.amount * p.price)) FROM varejo.carts c
            INNER JOIN varejo.products p
            ON p.id = c.products_id
            WHERE c.users_id = $1 AND c.selected = $2;
            `;

            const data = await client.query(sql, [id, true]);

            return { status: 204, err: null, response: data.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Carts;
