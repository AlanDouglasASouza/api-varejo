const Users = require("./users.js");

class Clients {
    #db;
    #user;

    constructor(_db) {
        this.#db = _db;
        this.#user = new Users(_db);
    }

    async getClients() {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.users WHERE (active = true AND admin = false);`
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createClient(data) {
        try {
            await this.#user.createUser(data);

            return { status: 200, error: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async updateClient(data) {
        try {
            await this.#user.updateUser(data);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async deleteClient(id) {
        try {
            await this.#user.deleteUser(id);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Clients;
