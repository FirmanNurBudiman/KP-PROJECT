const mysql = require('mysql2');

const dbPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "kp",
});

module.exports = dbPool.promise();