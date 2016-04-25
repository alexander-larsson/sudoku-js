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

fs.readFile(input_file_path, 'utf8', function(err, data) {
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

    console.log("Original sudoku: ");
    printSudokuGrid(grid);
    console.time("solve");
    var result = sudoku.solveAndVerifyUniqueSolution(grid);
    console.timeEnd("solve");
    console.log("Solved sudoku: ");
    printSudokuGrid(result.solution);
    console.log("Unique solution: " + (result.unique ? "yes" : "no"));
    console.log("Difficulty: " + result.difficulty);

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

var printSudokuGrid = function(grid) {
    console.log("-------------------------");
    for (var i = 0; i < grid.length; i++) {
        var row = grid[i];
        var rowString = "| ";
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            rowString += (cell + " ");
            if ((j + 1) % 3 === 0) {
                rowString += "| ";
            }
        }
        console.log(rowString);
        if ((i + 1) % 3 === 0) {
            console.log("-------------------------");
        }
    }
}
