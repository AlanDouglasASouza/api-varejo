const Products = require("./repositories/products.js");
const Users = require("./repositories/users.js");
const Admins = require("./repositories/admins.js");
const Clients = require("./repositories/clients.js");
const Carts = require("./repositories/carts.js");

class App {
    #db;
    products;
    users;
    admins;
    clients;
    carts;

    constructor() {
        this.#db = require("./repositories/index.js");
        this.products = new Products(this.#db);
        this.users = new Users(this.#db);
        this.admins = new Admins(this.#db);
        this.clients = new Clients(this.#db);
        this.carts = new Carts(this.#db);
    }
}

module.exports = App;
