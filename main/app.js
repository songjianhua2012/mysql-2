var express = require('express');
var bodyParser = require('body-parser');
var app = new express();

app.use(express.static('bower_components'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

// 加载hbs模块
var hbs = require('hbs');

var connectToMysql = require('../public/blog.js');

var backsort = require('../public/backsort.js');

var chuli = require('../chuli.js');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);


var my = new connectToMysql();

var result1 = [];

function deal(row) {
  result1 = chuli(row);
  return result1;
}

app.get('/', function(req, res) {
  var sql1 = 'select studentinfo.student_id,studentinfo.student_name,studentscore.score,subject.subject_name from studentinfo,studentscore,subject where studentinfo.student_id=studentscore.student_id and studentscore.subject_id = subject.subject_id';
  my.connect1();
  my.getBlogEntries(sql1, function(err, rows) {
    var array = deal(rows);
    res.render('index',{str:array});
    my.close1();
  });
});



app.get('/scores',function(req,res) {
  var array = req.query.sortkey;
  var flag1 = req.query.asc;
  my.connect1();
  var stuIn = backsort.getsortScores(result1,array,flag1);
  res.send(stuIn);
  my.close1();

});

app.delete('/del',function(req,res) {
  var a = req.query.key;
  var sql= 'delete from studentscore where student_id='+a;
  my.connect1();
  my.delete(sql);
  res.send(my.entries);
  my.close1();

});


app.get('/add',function(req,res) {
  my.connect1();
  var a = req.body.words1;
  var b = req.body.words2;
  var d = req.body.words4;
  var c = req.body.words3;

  var sql1 = 'insert into studentinfo(student_name) values('+'\''+a+'\''+')';
  my.delete(sql1,function(err,rows) {
    var stuId=rows.insertId;
    var sql2 = "insert into studentscore values " + "(\'\'," + stuId + ",1," + b + ")," + "(\'\'," + stuId + ",2," + c + ")," + "(\'\'," + stuId + ",3," + d + ");";
    my.delete(sql2,function(err,rows) {

      var resInfo = {stuId:stuId};
      res.send(resInfo);

      my.close1();
    });
  });
  


});

app.listen(3000);
