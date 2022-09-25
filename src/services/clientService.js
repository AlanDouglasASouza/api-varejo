const App = require("../app.js");

class ClientServices {
    #app;
    constructor() {
        this.#app = new App();
    }

    async get() {
        const data = await this.#app.clients.getClients();

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

        const createClient = await this.#app.clients.createClient(body);

        if (createClient.status === "ERROR") {
            return { status: 500, error: createClient.err };
        }

        return createClient;
    }

    async update(body) {
        const update = await this.#app.clients.updateClient(body);

        if (update.status === "ERROR") {
            return { status: 500, error: data.err };
        }

        return update;
    }

    async delete(id) {
        const del = await this.#app.clients.deleteClient(id);

        if (del.status === "ERROR") {
            return { status: 500, error: del.err };
        }

        return del;
    }
}

module.exports = new ClientServices();
