exports.getsortScores = function (stuInfo,array,flag) {
  console.log('first');
  var temp = 1;

  if(flag === 'true') {
    temp = 1;
  }
  else {
    temp = -1;
  }

  stuInfo.sort(function(a,b) {
    return temp*a[array] - temp*b[array];
  });
  return stuInfo;
};
