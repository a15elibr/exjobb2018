var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "elin",
  password: "elinis"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});