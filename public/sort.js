var result = [];

function insertScore(result) {
  console.log('fourth');
  $('tbody tr').empty();
  result.map(function(val) {
    $('table tbody').append("<tr>"+
                      "<td>"+val.name+"</td>"+
                      "<td>"+val.chinese+"</td>"+
                      "<td>"+val.math+"</td>"+
                      "<td>"+val.english+"</td>"+
                      '<td><input type="button" data-fa="del" value="删除" data-name={{name}}></td><td><input type="button" data-fa="chec" value="查看" data-name={{name}}></td>'+
                      "</tr>");
  });
}



$(function() {
  $('thead').on('click','th',function() {
    var flag = $(this).data('test');
    var tm = $(this).data('flag');
    if(flag === 'name') {
      return;
    }
    $.get('/scores',{sortkey:flag,asc:tm},function(resp) {
      console.log('third');
      insertScore(resp);
    });
    $(this).data('flag',!tm);
  });


  $('#add').on('click',function () {
    var name = $('ul input')[0].value;
    var chinese = $('ul input')[1].value;
    var math = $('ul input')[2].value;
    var english = $('ul input')[3].value;
    var str = 'insert into score(name,chinese,math,english) values(' +'\''+
    name +'\''+ ','+chinese+','+math+','+english+ ')';

    var newRow="<tr><td>"+name+"</td><td>"+chinese+"</td><td>"+math+"</td><td>"+
    english+"</td>"+'<td><input type="button" data-fa="del" value="删除" data-name={{name}}></td><td><input type="button" data-fa="chec" value="查看" data-name={{name}}></td></tr>';

    $("tbody").append(newRow);
    $.get('/add',{words:str},function(resp) {
      alert('add');
      $('ul input')[0].value = '';
      $('ul input')[1].value = '';
      $('ul input')[2].value = '';
      $('ul input')[3].value = '';
    });
 });

 $('#change').on('click',function () {
   var name = $('#change').parent().children()[0].value;
   var chinese = $('#change').parent().children()[1].value;
   var math = $('#change').parent().children()[2].value;
   var english = $('#change').parent().children()[3].value;
   var str = 'update score set '+'math='+math+','+
   'chinese='+chinese+','+'english='+english+ ' where name=' +'\''+name+'\'';

   $.get('/change',{words:str},function(resp) {
     alert('add');
     $('#change').parent().children()[0].value = '';
     $('#change').parent().children()[1].value = '';
     $('#change').parent().children()[2].value = '';
     $('#change').parent().children()[3].value = '';
   });
});

var countcheck = 0;
 $('tbody tr').on('click','td',function () {
   alert('delete');
   if($('input',this).data('fa') === 'del') {
   var str = 'delete from score where name=' + '\'' +$('input',this).data('name')+'\'';
      $.get('/del',{words:str},function(resp) {
        $('td').parent()[0].remove();
  });
}
   if($('input',this).data('fa') === 'chec') {
     alert($('input',this).data('fa'));
    var sql = 'select * from score where name=' + '\'' + ($('input',this).data('name'))+'\'';
    console.log(countcheck);
    if(countcheck === 0) {
    $.get('/check',{word:sql},function(resp) {
      console.log('ddddddd');
      console.log(resp);
        $('tbody').append('<td><p>'+'姓名'+resp[0].name+'语文'+resp[0].chinese+'数学'+resp[0].math+'英语'+resp[0].english+'</p></td>');

      });
      countcheck = 1;
    }
  }
  if(countcheck === 1) {
    $('tbody p').slideToggle("slow");
   }
});

});
