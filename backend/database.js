var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  port:3306,
  password: "",
  database:"fiverr"
});

con.connect(function(err) {
  if (err){
    console.log(err);
  }else
    console.log("Connected!");
});
module.exports=con;
