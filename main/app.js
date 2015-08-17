var express = require('express');
var app = new express();

app.use(express.static('bower_components'));
app.use(express.static('public'));

// 加载hbs模块
var hbs = require('hbs');

var connectToMysql = require('../public/blog.js');

var backsort = require('../public/backsort.js');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);


var my = new connectToMysql();

app.get('/', function(req, res) {
  var str1 = 'select * from score';
  my.connect1();
  my.getBlogEntries(sql1, function(err, rows) {

    res.render('index',{str:rows});
    my.close1();
  });
});

app.get('/check', function(req, res) {
  var a=req.query.word;
  my.close1();
  my.connect1();
   var s=my.getBlogEntries(a);
   console.log('fffffff');
   console.log(s);
   console.log('fffffff');
   res.send(my.entries);
});

app.get('/scores',function(req,res) {
  var array = req.query.sortkey;
  var flag1 = req.query.asc;
  my.close1();
  my.connect1();
  var stuIn = backsort.getsortScores(my.entries,array,flag1);
  console.log(stuIn);
  res.send(stuIn);
});

app.get('/del',function(req,res) {
  var a = req.query.words;
  my.close1();
  my.connect1();
  my.delete(a);
  res.send(my.entries);
});

app.get('/change',function(req,res) {
  var a = req.query.words;
  my.close1();
  my.connect1();
  my.delete(a);
  res.send(my.entries);
});

app.get('/add',function(req,res) {
  var a = req.query.words;
  console.log(a);
  my.close1();
  my.connect1();
  my.delete(a);
  res.send(a);
});

app.listen(3000);
