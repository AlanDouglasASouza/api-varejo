require("dotenv/config");
require("./src/repositories/index.js");
const express = require("express");
const app = express();
const router = require("./src/routes/router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.listen("8001", () => {
    console.log("Server ON in port 8001");
});
