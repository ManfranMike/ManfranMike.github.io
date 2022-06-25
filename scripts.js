var http = require('http');
var url  = require('url');
var fs = require('fs');

var bufferString;

function csvHandler(req, res){
  fs.readFile('techs.csv',function (err,data) {

  if (err) {
    return console.log(err);
  }

  //Convert and store csv information into a buffer. 
  bufferString = data.toString();
});}

csvHandler();
var techbox = $.csv.toObjects(bufferString);

console.log('test');
console.log(JSON.stringify(techbox));