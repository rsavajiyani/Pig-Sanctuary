//test
var mysql = require('mysql');
var connection;


if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'pig_sanctuary_db'
    });
};


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id: " + connection.threadId);
});

module.exports = connection;