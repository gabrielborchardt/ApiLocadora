var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '12345',
    database : 'mysql'
});
  
connection.connect(function(err) {
    if (err) {
      console.error('error: ' + err.message);
      process.exit();
    }

    console.log('Conectado com sucesso ao MySQL server.');
  });

module.exports = connection;
