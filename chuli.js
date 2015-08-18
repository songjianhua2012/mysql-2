function writeAllScores(data) {
 var result = [];
 data.forEach(function(val) {
   AddData(val, result);
 });
 return result;
}

function AddData(val, result) {
 for (var i = 0; i < result.length; i++) {
   if (val.student_name === result[i].name) {
     result[i][val.subject_name] = val.score;
     return;
   }
 }
 var obj = {};
 obj.id = val.student_id;
 obj.name = val.student_name;
 obj[val.subject_name] = val.score;
 result.push(obj);
}

module.exports = writeAllScores;
