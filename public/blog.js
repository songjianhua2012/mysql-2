//var entries = [];

var mysql      = require('mysql');

function connectToMysql() {
  this.connection = {};
  this.entries = [];
}

connectToMysql.prototype.connect1 = function() {
  this.connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'songjianhua',
    database : 'TW'
  });
};

connectToMysql.prototype.close1 = function() {
  this.connection.end();
};

connectToMysql.prototype.getBlogEntries = function(sql) {
    var that = this;
    this.connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
      that.entries = rows;
      console.log(that.entries);
      func(err, rows, fields);
  });
};

connectToMysql.prototype.delete = function(str) {
      console.log(str);
      var that = this;
      this.connection.query(str, function(err, rows, fields) {
      if (err) throw err;
  });
};


module.exports = connectToMysql;
