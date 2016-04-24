"use strict";

// ############# Requires ###############
var fs = require('fs');
var sudoku = require('./sudoku.js');

// ############# Global vars ############
var input_file_path = "";

// ############# Main code ##############

if (process.argv.length === 3) {
    input_file_path = process.argv[2];
} else {
    console.log("Invalid number of arguments.\nUsage: node app.js <file-path>")
    process.exit(1);
}

fs.readFile(input_file_path, 'utf8', (err, data) => {
    if (err) {
        console.log(err.stack);
        process.exit(1);
    }

    var rows = data.split(/\r?\n/).splice(0, 9);
    if (rows.length !== 9) {
        console.log("Invalid file format, not enough rows");
        process.exit(1);
    }
    var grid = rows.map(rowStringToArray);
    var sudokuProblem = sudoku(grid);

    sudokuProblem.print();
    sudokuProblem.solve();
    sudokuProblem.print();

});

// ############# Helpers ################

var rowStringToArray = function(row) {
    if (row.length !== 9) {
        console.log("Invalid file format, invalid row length (expected: 9)");
        process.exit(1);
    }

    var res = [];

    for (var i = 0; i < row.length; i++) {
      var currentChar = row.charAt(i);
      if(currentChar.match(/[1-9]/)){
        res.push(Number(currentChar));
      } else {
        res.push(0);
      }
    }

    return res;
}
