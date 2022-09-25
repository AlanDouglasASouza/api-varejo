class Users {
    #db;

    constructor(_db) {
        this.#db = _db;
    }

    async getUsers() {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.users WHERE active = true;`
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createUser(data) {
        try {
            const client = await this.#db;
            const sql =
                "INSERT INTO varejo.users (name, email, password, cpf, cep, address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id;";
            const values = [
                data.name,
                data.email,
                data.password,
                data.cpf,
                data.cep,
                data.address,
            ];

            const user = await client.query(sql, values);

            return { status: 200, error: null, id: user.rows[0].id };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async updateUser(data) {
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

            const queryReplace = `UPDATE varejo.users SET/ updated_at=$${
                helpQuery.count + 1
            } WHERE id=$${helpQuery.count};`;
            const sql = queryReplace.replace("/", helpQuery.columns);

            await client.query(sql, helpQuery.values);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async deleteUser(id) {
        try {
            const client = await this.#db;
            const sql =
                "UPDATE varejo.users SET active=$1, deleted_at=$2 WHERE id=$3 ;";
            const dateNow = new Date();

            await client.query(sql, [false, dateNow, id]);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Users;
