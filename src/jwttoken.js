var jwt = require('jsonwebtoken');
  var token = jwt.sign({"iss": "ATwXFTUsC0G1aij_4EK6WEzr_8cd8kfFRHkJxwtNyLQ4yZsEk2p9HXzNNcZ1Xyrc1irtscu2XPIwaSaq",
  "email":"inweb1@test.com"},null, { algorithm: 'none' });
  console.log(token);

  jwt.verify(token, null, { algorithm: 'none' },function(err, decoded) {
    console.log(decoded) // bar
  });