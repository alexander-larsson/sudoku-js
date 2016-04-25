"use strict";
module.exports = function Sudoku(sudokuGrid) {

    //Private variables
    var sudokuSize = 9;
    var squareSize = 3;
    var foundSolutions = 0;
    var backtracks = 0;
    var sudokuSolution;

    // TODO: Borde kolla om det finns några regelbrott i originalproblemet
    // innan jag löser det.

    // TODO: Hanterar ej olösbara sudoku.

    //Private functions

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

    var copyMatrix = function(matrixToCopy) {
        return matrixToCopy.map(function(row) {
            return row.slice();
        });
    }

    var checkRow = function(grid, value, row) {
        for (var i = 0; i < sudokuSize; i++) {
          if(grid[row][i] === value) {
            return false;
          }
        }
        return true;
    };

    var checkColumn = function(grid, value, column) {
      for (var i = 0; i < sudokuSize; i++) {
        if(grid[i][column] === value) {
          return false;
        }
      }
      return true;
    };

    var checkSquare = function(grid, value, row, column) {
        var squareCornerRow = row - row % squareSize;
        var squareCornerColumn = column - column % squareSize;

        for (var i = squareCornerRow; i < squareCornerRow + squareSize; i++) {
            for (var j = squareCornerColumn; j < squareCornerColumn + squareSize; j++) {
                if (sudokuGrid[i][j] === value) {
                    return false;
                }
            }
        }
        return true;
    };

    var checkGrid = function(grid, value, row, column) {
        var rowOk = checkRow(grid, value, row);
        var columnOk = checkColumn(grid, value, column);
        var squareOk = checkSquare(grid, value, row, column);
        return rowOk && columnOk && squareOk;
    };

    var solveNext = function(grid, row, column, requiredSulutions) {
        if (column === (sudokuSize - 1) && row === (sudokuSize - 1)) {
            sudokuSolution = copyMatrix(sudokuGrid);
            foundSolutions++;
            return;
        }
        if (column < (sudokuSize - 1)) {
            solveRecursion(grid, row, column + 1, requiredSulutions);
        } else {
            solveRecursion(grid, row + 1, 0, requiredSulutions);
        }
    }

    var solveRecursion = function(grid, row, column, requiredSulutions) {
        if (sudokuGrid[row][column] !== 0) {
            solveNext(grid, row, column, requiredSulutions);
        } else {
            for (var val = 1; val <= sudokuSize; val++) {
                if (checkGrid(grid, val, row, column) && foundSolutions < requiredSulutions) {
                    sudokuGrid[row][column] = val;
                    solveNext(grid, row, column, requiredSulutions);
                    if (foundSolutions < 1) {
                        backtracks++;
                    }
                }
            }
            sudokuGrid[row][column] = 0;
        }
    };

    //Public functions
    return {
        printSolution: function() {
            if (sudokuSolution === undefined) {
                console.log("The sudoku has not been solved yet");
            } else {
                printSudokuGrid(sudokuSolution);
            }
        },
        printOriginal: function() {
            printSudokuGrid(sudokuGrid);
        },
        solve: function() {
            solveRecursion(sudokuGrid, 0, 0, 1);
        },
        solveAndVerifyUniqueSolution: function() {
            solveRecursion(sudokuGrid, 0, 0, 2);
            return foundSolutions === 1;
        },
        difficulty: function() {
            if (backtracks < 1500) {
                return "easy";
            } else if (backtracks < 10000) {
                return "medium";
            } else if (backtracks < 50000) {
                return "hard";
            } else {
                return "samurai"
            }
        }
    };
};
