"use strict";
module.exports = (function Sudoku() {

    // ############# Private variables ##########
    var sudokuSize = 9;
    var squareSize = 3;
    var foundSolutions = 0;
    var backtracks = 0;
    var sudokuSolution;

    // TODO: Borde kolla om det finns några regelbrott i originalproblemet
    // innan jag löser det.

    // TODO: Hanterar ej olösbara sudoku.

    // ############# Private functions ##########
    var copyMatrix = function(matrixToCopy) {
        return matrixToCopy.map(function(row) {
            return row.slice();
        });
    }

    // Returns false if 'value' is present in the grid on
    // row 'row', otherwise false.
    var checkRow = function(grid, value, row) {
        for (var i = 0; i < sudokuSize; i++) {
            if (grid[row][i] === value) {
                return false;
            }
        }
        return true;
    };

    // Returns false if 'value' is present in the grid on
    // column 'column', otherwise false.
    var checkColumn = function(grid, value, column) {
        for (var i = 0; i < sudokuSize; i++) {
            if (grid[i][column] === value) {
                return false;
            }
        }
        return true;
    };

    // Returns false if 'value' is present in the 3x3 square where
    // ('row','column') belongs, otherwise false.
    var checkSquare = function(grid, value, row, column) {
        var squareCornerRow = row - row % squareSize;
        var squareCornerColumn = column - column % squareSize;

        for (var i = squareCornerRow; i < squareCornerRow + squareSize; i++) {
            for (var j = squareCornerColumn; j < squareCornerColumn + squareSize; j++) {
                if (grid[i][j] === value) {
                    return false;
                }
            }
        }
        return true;
    };

    // Returns true if the insertion value 'value' in the grid on
    // positon ('row','column') does not break any of the sudoku
    // rules. Returns false otherwise.
    var checkGrid = function(grid, value, row, column) {
        var rowOk = checkRow(grid, value, row);
        var columnOk = checkColumn(grid, value, column);
        var squareOk = checkSquare(grid, value, row, column);
        return rowOk && columnOk && squareOk;
    };

    // Returns true if the grid does not break the sudoku rules.
    var verifyValidGrid = function(grid) {
        for (var i = 0; i < sudokuSize; i++) {
            for (var j = 0; j < sudokuSize; j++) {
                if (grid[i][j] !== 0) {
                    var currentValue = grid[i][j];
                    grid[i][j] = 0;
                    var currentValueOk = checkGrid(grid, currentValue, i, j);
                    grid[i][j] = currentValue;
                    if (!currentValueOk) {
                        return false;
                    }
                }

            }
        }
        return true;
    }

    // Moves the recursive algorithm to the next position in the grid.
    // Also saves the grid if solved and counts solutions.
    var solveNext = function(grid, row, column, requiredSulutions) {
        if (column === (sudokuSize - 1) && row === (sudokuSize - 1)) {
            // A solution has been found.
            sudokuSolution = copyMatrix(grid);
            foundSolutions++;
            return;
        }
        if (column < (sudokuSize - 1)) {
            // Go to the next position in the same row.
            solveRecursion(grid, row, column + 1, requiredSulutions);
        } else {
            // Go to a new row.
            solveRecursion(grid, row + 1, 0, requiredSulutions);
        }
    }

    var solveRecursion = function(grid, row, column, requiredSulutions) {
        if (grid[row][column] !== 0) {
            // The value on this position on the grid is given, move on.
            solveNext(grid, row, column, requiredSulutions);
        } else {
            // The value on this position on the grid has to be
            // found, find a suitable value.
            for (var val = 1; val <= sudokuSize; val++) {
                if (checkGrid(grid, val, row, column) && foundSolutions < requiredSulutions) {
                    grid[row][column] = val;
                    solveNext(grid, row, column, requiredSulutions);
                    if (foundSolutions < 1) {
                        backtracks++;
                    }
                }
            }
            // Algortihm is backtracking, reset the value on this position to 0.
            grid[row][column] = 0;
        }
    };

    var difficulty = function() {
        if (backtracks < 1500) {
            return "easy";
        } else if (backtracks < 10000) {
            return "medium";
        } else if (backtracks < 50000) {
            return "hard";
        } else {
            return "samurai"
        }
    };

    var resetStates = function() {
        foundSolutions = 0;
        backtracks = 0;
        sudokuSolution = null;
    };

    // ############# Public functions ###########
    var solve = function(sudokuGrid) {
        var gridIsValid = verifyValidGrid(sudokuGrid);
        if(gridIsValid){
          solveRecursion(sudokuGrid, 0, 0, 1);
        }
        var result;
        if (!sudokuSolution || !gridIsValid) {
            result = {
                error: "The sudoku could not be solved"
            };
        } else {
            result = {
                solution: copyMatrix(sudokuSolution),
                difficulty: difficulty()
            };
        }
        resetStates()
        return result;
    };

    var solveAndVerifyUniqueSolution = function(sudokuGrid) {
        var gridIsValid = verifyValidGrid(sudokuGrid);
        if(gridIsValid){
          solveRecursion(sudokuGrid, 0, 0, 2);  
        }
        var result;
        if (!sudokuSolution || !gridIsValid) {
            result = {
                error: "The sudoku could not be solved"
            };
        } else {
            var result = {
                solution: copyMatrix(sudokuSolution),
                difficulty: difficulty(),
                unique: foundSolutions === 1
            };
        }
        resetStates()
        return result;
    };


    var generate = function() {
        return "stuff";
    };

    return {
        solve: solve,
        solveAndVerifyUniqueSolution: solveAndVerifyUniqueSolution,
        generate: generate
    };
})();
