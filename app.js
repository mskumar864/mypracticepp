var express = require("express");
var app = new express();
var path = require("path");
app.use(express.static(path.join(__dirname,"src")));

app.post("/phpexecute",function(request,response){
    console.log(request);
    response.end();
})
app.listen(4000, function(){
    console.log("sd");
})