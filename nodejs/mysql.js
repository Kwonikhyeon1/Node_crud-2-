let mysql = require('mysql');
let connection = mysql.createConnection({
    // host: 'localhost',           
    host: '192.168.56.101',
    user: 'root',
    password: '1234',
    database: 'OPENTUTORIALS', 
});

connection.connect();

connection.query('SELECT * FROM TOPIC', function(error, result, fields) {

    if (error) {
        console.log('error: ', error);

    }

    console.log('result: ', result); // data type: Array

});

connection.end();