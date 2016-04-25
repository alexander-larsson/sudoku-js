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

var generatedSudoku = sudoku.generate();
printSudokuGrid(generatedSudoku);
