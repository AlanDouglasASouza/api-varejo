async function connect() {
    if (global.connection) return global.connection.connect();

    const { Pool } = require("pg");
    const pool = new Pool({
        user: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DBNAME,
        password: process.env.DBPASSWORD,
        port: process.env.DBPORT,
        max: 20,
    });

    const client = await pool.connect();
    console.log("Pool PostgreSQL created!");

    const res = await client.query("SELECT NOW()");

    client.release();

    global.connection = pool;
    return pool.connect();
}

module.exports = connect();
