//email
var jwt = require('jsonwebtoken');
  //var token = jwt.sign({"iss": "AU4kkD6HuzjSwSkixUsqtYGnKY8bO_jIZHD4aXzBToRLxc6hjnFSbem0sNkSdY5QLBvREwDvKarxd37x",
  //"email":"usmptest001@test.com"},null, { algorithm: 'none' });
  //console.log(token);

  var token = jwt.sign({"iss": "AU4kkD6HuzjSwSkixUsqtYGnKY8bO_jIZHD4aXzBToRLxc6hjnFSbem0sNkSdY5QLBvREwDvKarxd37x",
  "email":"usbuyer1@test.com"},null, { algorithm: 'HS256' });
  console.log(token);

  jwt.verify(token, null, { algorithm: 'none' },function(err, decoded) {
    console.log(decoded) // bar
  });
  
  //payer id


  var token = jwt.sign({"iss": "ATwXFTUsC0G1aij_4EK6WEzr_8cd8kfFRHkJxwtNyLQ4yZsEk2p9HXzNNcZ1Xyrc1irtscu2XPIwaSaq",
  "payer_id":"DVJNWFH4X8NZG"},null, { algorithm: 'none' });
  console.log(token);

  jwt.verify(token, null, { algorithm: 'none' },function(err, decoded) {
    console.log(decoded) // bar
  });
  