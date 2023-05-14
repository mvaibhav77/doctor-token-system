const Pool = require("pg").Pool;
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    password: process.env.PQL_PASS,
    host: "localhost",
    port: 5432,
    database: "doctor"
});

module.exports = pool;