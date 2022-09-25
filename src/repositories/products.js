class Products {
    #db;

    constructor(_db) {
        this.#db = _db;
    }

    async getProducts() {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.products p
                 INNER JOIN varejo.categories c
                 ON p.categories_id = c.category_name
                
                 INNER JOIN varejo.brands b
                 ON p.brands_id = b.brands_name
                 WHERE p.deleted = $1;`,
                [false]
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async getByCategory(category, order) {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.products WHERE categories_id = $1 AND deleted = $2 ORDER BY price ${order};`,
                [category, false]
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async getByBrand(brand, order) {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.products WHERE brands_id = $1 AND deleted = $2 ORDER BY price ${order};`,
                [brand, false]
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createProduct(data) {
        try {
            const client = await this.#db;
            const sql =
                "INSERT INTO varejo.products (categories_id, brands_id, product_name, price, description, amount, image) VALUES ($1,$2,$3,$4,$5,$6,$7);";
            const values = [
                data.categories_id,
                data.brands_id,
                data.product_name,
                data.price,
                data.description,
                data.amount,
                data.image,
            ];

            await client.query(sql, values);

            return { status: 200, error: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async updateProduct(data) {
        try {
            const client = await this.#db;
            const date = new Date();
            const helpQuery = {
                columns: "",
                count: 0,
                values: [],
            };

            for (const column in data) {
                helpQuery.count++;
                if (column != "id") {
                    helpQuery.columns += ` ${column}=$${helpQuery.count},`;
                }
                helpQuery.values.push(data[column]);
            }

            helpQuery.values.push(date);

            const queryReplace = `UPDATE varejo.products SET/ updated_at=$${
                helpQuery.count + 1
            } WHERE id=$${helpQuery.count};`;
            const sql = queryReplace.replace("/", helpQuery.columns);

            await client.query(sql, helpQuery.values);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async deleteProduct(id) {
        try {
            const client = await this.#db;
            const sql =
                "UPDATE varejo.products SET deleted=$1, deleted_at=$2 WHERE id=$3 ;";
            const dateNow = new Date();

            await client.query(sql, [true, dateNow, id]);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Products;
