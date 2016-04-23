// Requires
var fs = require('fs');

// Global vars
var input_file_path = "";


if(process.argv.length === 3){
  input_file_path = process.argv[2];
} else {
  console.log("Invalid number of arguments.\nUsage: node app.js <file-path>")
  process.exit(1);
}

fs.readFile(input_file_path, 'utf8', function (err,data) {
  if (err) {
    return console.log(err.stack);
  }
  console.log(data);
});
