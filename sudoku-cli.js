"use strict";

// ############# Requires ###############
var fs = require('fs');
var sudoku = require('./sudoku.js');

// ############# Global vars ############
var input_file_path = "";

// ############# Helpers ################

// Converts a string (a row in the file) to an array of numbers 0-9
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

// ############# Main code ##############

if(process.argv[2] === "solve" && process.argv.length === 4){
  input_file_path = process.argv[3];
  fs.readFile(input_file_path, 'utf8', function(err, data) {
      if (err) {
          console.log(err.stack);
          process.exit(1);
      }

      // Split text from file on newlines
      var rows = data.split(/\r?\n/).splice(0, 9);
      if (rows.length !== 9) {
           console.log("Invalid file format, not enough rows");
           process.exit(1);
      }
      // Create the numerical sudoku grid, 0 represents empty
      var grid = rows.map(rowStringToArray);

      console.log("Original sudoku: ");
      printSudokuGrid(grid);
      //console.time("solve");
      var result = sudoku.solveAndVerifyUniqueSolution(grid);
      //console.timeEnd("solve");
      if(result.error){
        console.log(result.error);
      } else {
        console.log("Solved sudoku: ");
        printSudokuGrid(result.solution);
        console.log("Unique solution: " + (result.unique ? "yes" : "no"));
        console.log("Difficulty: " + result.difficulty);
      }
  });
} else if (process.argv[2] === "generate") {
  var generatedSudoku = sudoku.generate();
  printSudokuGrid(generatedSudoku);
} else {
  console.log("Invalid arguments.\nUsage: node sudoku-cli.js <generate or solve> <file-path if solve>")
  process.exit(1);
}
