const fs = require("fs");
var path = require("path");

var args = process.argv.slice(2);

console.log(args);

var location = args[0];

const dirs = fs.readdirSync(location);

dirs.forEach(dir => {
    console.log(location + "/" + dir)
});

