"use strict";
module.exports = (function Sudoku() {

    // ############# Constant values ############
    // My linter doesnt like 'const' :(
    var sudokuSize = 9;
    var squareSize = 3;
    var maxRecursionSteps = 300000; // Consider impossible if more than this

    // ############# Private variables ##########
    var foundSolutions = 0;
    var backtracks = 0;
    var recursionSteps = 0;
    var sudokuSolution = null;

    // ############# Private functions ##########

    // ###### Sudoku solving ########

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

    // Verifies that the grid is the right size
    var verifyValidGridSize = function(grid) {
      if(grid.length !== sudokuSize){
        return false;
      }
      for (var i = 0; i < grid.length; i++) {
        if(grid[i].length !== sudokuSize){
          return false;
        }
      }
      return true;
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
    };

    // Moves the recursive algorithm to the next position in the grid.
    // Also saves the grid if solved and counts solutions.
    var solveNext = function(grid, row, column, requiredSolutions) {
        if (column === (sudokuSize - 1) && row === (sudokuSize - 1)) {
            // A solution has been found.
            sudokuSolution = copyMatrix(grid);
            foundSolutions++;
            return;
        }
        if (column < (sudokuSize - 1)) {
            // Go to the next position in the same row.
            solveRecursion(grid, row, column + 1, requiredSolutions);
        } else {
            // Go to a new row.
            solveRecursion(grid, row + 1, 0, requiredSolutions);
        }
    };

    // Recursive sudoku solving algorithm
    var solveRecursion = function(grid, row, column, requiredSolutions) {
        recursionSteps++;
        if (grid[row][column] !== 0) {
            // The value on this position on the grid is given, move on.
            solveNext(grid, row, column, requiredSolutions);
        } else {
            // The value on this position on the grid has to be
            // found, find a suitable value.
            for (var val = 1; val <= sudokuSize; val++) {
                var valIsValid = checkGrid(grid, val, row, column);
                var enoughSolutions = foundSolutions < requiredSolutions;
                var giveUp = recursionSteps >= maxRecursionSteps;
                if (valIsValid && enoughSolutions && !giveUp) {
                    grid[row][column] = val;
                    solveNext(grid, row, column, requiredSolutions);
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



    // ###### Sudoku generation #####

    var generateEmptyGrid = function() {
        var res = Array(9);
        for (var i = 0; i < res.length; i++) {
            res[i] = Array(9).fill(0);
        }
        return res;
    }

    // Generate random integer, both min and max is inclusive
    var randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var randomIndexInList = function(list) {
      return randomInt(0, list.length - 1);
    }

    var generateListOfAllPositions = function() {
        var res = []
        for (var i = 0; i < sudokuSize; i++) {
            for (var j = 0; j < sudokuSize; j++) {
                res.push({
                    row: i,
                    column: j
                });
            }
        }
        return res;
    }

    // In-place shuffle based on Fisher–Yates shuffle
    var shuffleList = function(list) {
      for(var i = list.length; i > 0; i--){
        var j = Math.floor(Math.random() * i);
        i--;
        var temp = list[i];
        list[i] = list[j];
        list[j] = temp;
      }
      return list
    };

    // Get all valid values for position ('row','column')
    var validNumbersForPosition = function(grid, row, column) {
        var validNumbers = [];
        for (var i = 0; i <= sudokuSize; i++) {
            if (checkGrid(grid, i, row, column)) {
                validNumbers.push(i);
            }
        }
        return validNumbers;
    };

    // ###### Other helpers #########

    var copyMatrix = function(matrixToCopy) {
        return matrixToCopy.map(function(row) {
            return row.slice();
        });
    };

    var resetStates = function() {
        foundSolutions = 0;
        backtracks = 0;
        sudokuSolution = null;
        recursionSteps = 0;
    };

    // ############# Public functions ###########

    // Solves the sudoku, doesn't verify unique
    var solve = function(sudokuGrid) {
        var gridIsValid = verifyValidGridSize(sudokuGrid) && verifyValidGrid(sudokuGrid);
        if (gridIsValid) {
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

    // Solves the sudoku and verifies that it is unique
    var solveAndVerifyUniqueSolution = function(sudokuGrid) {
        var gridIsValid = verifyValidGridSize(sudokuGrid) && verifyValidGrid(sudokuGrid);
        if (gridIsValid) {
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


    // Generates a random sudoku
    var generate = function() {

        // First, generate a full valid sudoku board
        var generatedSudoku = generateEmptyGrid();
        var positionList = generateListOfAllPositions();

        // Repeat until all positions has a value
        while(positionList.length > 0) {
          // Pick a random position and valid number for that position
          var randomPositionIndex = randomIndexInList(positionList);
          var randomPosition = positionList[randomPositionIndex];
          var validNumbers = validNumbersForPosition(generatedSudoku, randomPosition.row, randomPosition.column);
          var randomValidNumerPosition = randomIndexInList(validNumbers);
          var randomValidNumber = validNumbers[randomValidNumerPosition];
          var result; // My linter doesn't like 'let' :(

          // Add the number to the position
          generatedSudoku[randomPosition.row][randomPosition.column] = randomValidNumber;
          // Check so that the board has a valid solution
          result = solve(generatedSudoku);
          if(result.error) { // Has no valid solution
            generatedSudoku[randomPosition.row][randomPosition.column] = 0;
          } else { // Has valid solution
            positionList.splice(randomPositionIndex, 1);
          }

        }

        // We now have a full board remove as many values as possible

        // Refill the positionList and shuffle it
        positionList = generateListOfAllPositions();
        shuffleList(positionList);

        // Go through the list and remove the value at as many positions
        // as possible.
        for (var i = 0; i < positionList.length; i++) {
          var currentPosition = positionList[i];
          var currentPositionValue = generatedSudoku[currentPosition.row][currentPosition.column];
          generatedSudoku[currentPosition.row][currentPosition.column] = 0;

          // If there is no unique solution without the value, put it back
          result = solveAndVerifyUniqueSolution(generatedSudoku);
          if(!result.unique) {
            generatedSudoku[currentPosition.row][currentPosition.column] = currentPositionValue;
          }
        }
        return generatedSudoku;
    };

    return {
        solve: solve,
        solveAndVerifyUniqueSolution: solveAndVerifyUniqueSolution,
        generate: generate
    };
})();
