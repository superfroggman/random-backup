const fs = require("fs");
var path = require("path");

var args = process.argv.slice(2);

console.log(args);

var location = args[0];

var allPossibleFiles = [];

function checkDir(loc) {
  //console.log(loc);
  var dirs = fs.readdirSync(loc);
  dirs.forEach((dir) => {
    var path = loc + "/" + dir;
    //console.log(path);
    //console.log(fs.lstatSync(path).isDirectory());
    if (fs.lstatSync(path).isDirectory()) {
      checkDir(path);
    } else {
      allPossibleFiles.push(path);
    }
  });
}

checkDir(location);

console.log(allPossibleFiles);
