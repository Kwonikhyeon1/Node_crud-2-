let mysql = require('mysql');
let db = mysql.createConnection({
    // host: 'localhost',           
    host: '192.168.56.101',
    user: 'root',
    password: '1234',
    database: 'OPENTUTORIALS', 
});
db.connect();

module.exports = db;