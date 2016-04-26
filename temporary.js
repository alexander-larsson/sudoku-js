"use strict";
var sudoku = require('./sudoku.js');

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

// Impossible to solve example
var x = [ [ 4, 0, 0, 0, 0, 0, 0, 6, 0 ],
  [ 0, 0, 0, 0, 7, 0, 0, 3, 0 ],
  [ 0, 0, 0, 0, 3, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 5, 0, 0 ],
  [ 0, 8, 1, 0, 0, 7, 2, 0, 0 ],
  [ 0, 0, 7, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 2, 0, 0, 0, 0, 0, 3 ],
  [ 0, 0, 0, 0, 0, 4, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 7, 0, 6 ] ]


var generatedSudoku = sudoku.generate();
printSudokuGrid(generatedSudoku);
