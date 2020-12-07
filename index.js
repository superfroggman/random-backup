const fs = require("fs");
var path = require("path");
var FormData = require("form-data");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

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

let file =
  allPossibleFiles[Math.floor(Math.random() * allPossibleFiles.length)];
console.log(allPossibleFiles);
console.log(file);

upload(file);

function upload(file) {
  var formData = new FormData();
  var xhr = new XMLHttpRequest();

  console.log("this is the file: " + fs.createReadStream(file));
  formData.append("theFile", fs.createReadStream(file));

  xhr.onreadystatechange = function () {
    console.log(this.status);
    console.log("reps." + this.responseText);
    var jsonobj = JSON.parse(this.responseText);
    if (this.status == 200) {
      console.log("https://uploads.marksism.space" + jsonobj.link);
    } else {
      console.log("Något gick fel");
    }
  };

  xhr.open("POST", "https://uploads.marksism.space/");
  xhr.send(formData);
}
