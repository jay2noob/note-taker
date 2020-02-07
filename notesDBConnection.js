const mysql = require("mysql");

const connection = mysql.connection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database:""
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});