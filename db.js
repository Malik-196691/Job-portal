const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "job portal",
  password: "malik123@",
  port: 5432,
});

module.exports = pool;
