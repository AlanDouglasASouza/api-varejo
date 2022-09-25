const App = require("../app.js");

class AdminServices {
    #app;
    constructor() {
        this.#app = new App();
    }

    async get() {
        const data = await this.#app.admins.getAdmins();

        if (data.status === "ERROR") {
            return { error: data.err };
        }

        return { error: null, data: data };
    }

    async create(body) {
        if (
            typeof body.name != "string" ||
            typeof body.email != "string" ||
            typeof body.password != "string" ||
            typeof body.cpf != "number" ||
            typeof body.cep != "number" ||
            typeof body.address != "string"
        ) {
            return { status: 400, error: "Bad Request" };
        }

        const createAdmin = await this.#app.admins.createAdmin(body);

        if (createAdmin.status === "ERROR") {
            return { status: 500, error: createAdmin.err };
        }

        return createAdmin;
    }

    async update(body) {
        const update = await this.#app.admins.updateAdmin(body);

        if (update.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return update;
    }

    async delete(id) {
        const del = await this.#app.admins.deleteAdmin(id);

        if (del.status === "ERROR") {
            return { status: 500, error: del.err };
        }

        return del;
    }
}

module.exports = new AdminServices();
