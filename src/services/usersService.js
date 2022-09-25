const App = require("../app.js");

class UserServices {
    #app;
    constructor() {
        this.#app = new App();
    }

    async get() {
        const data = await this.#app.users.getUsers();

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

        const createUser = await this.#app.users.createUser(body);

        if (createUser.status === "ERROR") {
            return { status: 500, error: createUser.err };
        }

        return createUser;
    }

    async update(body) {
        const update = await this.#app.users.updateUser(body);

        if (update.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return update;
    }

    async delete(id) {
        const del = await this.#app.users.deleteUser(id);

        if (del.status === "ERROR") {
            return { status: 500, error: del.err };
        }

        return del;
    }
}

module.exports = new UserServices();
