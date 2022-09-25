const Users = require("./users.js");

class Admins {
    #db;
    #user;

    constructor(_db) {
        this.#db = _db;
        this.#user = new Users(_db);
    }

    async getAdmins() {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.users WHERE (active = true AND admin = true);`
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async getAdminById(id) {
        try {
            const client = await this.#db;
            const res = await client.query(
                `SELECT * FROM varejo.admins WHERE (active = $1 AND users_id = $2);`,
                [true, id]
            );

            return { status: "OK", response: res.rows };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async createAdmin(data) {
        try {
            const client = await this.#db;
            const admin = await this.#user.createUser(data);
            const idUser = admin.id;

            await this.#user.updateUser({
                admin: true,
                id: idUser,
            });

            const sql = "INSERT INTO varejo.admins (users_id) VALUES ($1);";
            const values = [idUser];

            await client.query(sql, values);

            return { status: 200, error: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async updateAdmin(data) {
        try {
            await this.#user.updateUser(data);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }

    async deleteAdmin(id) {
        try {
            const adminId = await this.getAdminById(id);
            const client = await this.#db;
            const sql =
                "UPDATE varejo.admins SET active=$1, deleted_at=$2 WHERE id=$3 ;";
            const dateNow = new Date();

            console.log("Pro Admin => ", adminId);

            await client.query(sql, [false, dateNow, adminId.response[0].id]);

            await this.#user.deleteUser(id);

            return { status: 204, err: null };
        } catch (err) {
            return { status: "ERROR", err };
        }
    }
}

module.exports = Admins;
