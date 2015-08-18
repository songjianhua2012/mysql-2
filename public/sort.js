var result = [];

function insertScore(result) {
  console.log('fourth');
  $('tbody tr').empty();
  result.map(function(val) {
    $('table tbody').append("<tr>"+"<td>"+val.id+"</td>"+
                      "<td>"+val.name+"</td>"+
                      "<td>"+val.chinese+"</td>"+
                      "<td>"+val.math+"</td>"+
                      "<td>"+val.english+"</td>"+
                      '<td><input type="button" data-fa="del" value="删除" data-name={{id}} id="dele"></td>'+
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

    $.get('/add',{words1:name,words2:chinese,words3:math,words4:english},function(resp) {
      var newRow="<tr><td>"+resp.stuId+"</td><td>"+name+"</td><td>"+chinese+"</td><td>"+math+"</td><td>"+
      english+"</td>"+'<td><input type="button" data-fa="del" value="删除" data-name={{id}} id="dele"></td></tr>';
      $("tbody").append(newRow);
      $('ul input')[0].value = '';
      $('ul input')[1].value = '';
      $('ul input')[2].value = '';
      $('ul input')[3].value = '';
    });
 });



var countcheck = 0;
 $('tbody').on('click','#dele',function () {
   alert('delete');
  var temp = $(this).data('name');
  alert(temp);
      $.ajax({url:'/del?key='+temp,type:'DELETE',success:function(resp) {

        $('td').parent()[0].remove();
  }
  });
});

});
