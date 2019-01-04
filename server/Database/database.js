let mysql = require('mysql');

let connection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
   	user: process.env.DB_USER,
    password: process.env.DB_PASS,
   	database:process.env.DATABASE,
    port: 3306,
    debug: false,
    multipleStatements: true
});

module.exports.connection = connection;
