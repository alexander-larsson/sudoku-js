module.exports = function Sudoku(sudokuGrid) {

  //Private variables
  var sudokuSize = 9;
  var squareSize = 3;
  var foundSolutions = 0;
  var requiredSulutions = 1;
  // var sudokuGrid = sudokuGridToBeSolved;

  // Se upp för problem med att siffran redan finns eftersom jag själv
  // stoppat in den i backtracking algorithmen, dessa functioner kollar
  // alla värden.

  // Kan fixa ovanstående genom att bara sätta den till ett.

  // Borde kolla om det finns några regelbrott i originalproblemet

  //Private functions
  var checkArray = function(array, value) {
    return array.reduce((previous, current) => {
      return previous ? true : current === value;
    }, false);
  }

  var checkRow = function(grid, value, row) {
    var rowToCheck = grid[row];
    var valueExists = checkArray(rowToCheck, value);
    return !valueExists;
  };

  var checkColumn = function(grid, value, column) {
    var columnToCheck = grid.map((row) => {
      return row[column];
    });
    var valueExists = checkArray(columnToCheck, value);
    return !valueExists;
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

  var solveNext = function(grid,row,column){
    if(column === (sudokuSize - 1) && row === (sudokuSize -1)){
      foundSolutions++;
      return;
    }
    if(column < (sudokuSize - 1)) {
      solveRecursion(grid, row, column + 1);
    } else {
      solveRecursion(grid, row + 1, 0);
    }
  }

  var solveRecursion = function(grid,row,column) {
    //console.log("row: " + row + " column: " + column);
    if(sudokuGrid[row][column] !== 0){
      solveNext(grid,row,column);
    } else {
      for (var val = 1; val <= sudokuSize; val++){
        if(checkGrid(grid,val,row,column) && foundSolutions < requiredSulutions){
          sudokuGrid[row][column] = val;
          solveNext(grid,row,column);
        }
      }
      if(foundSolutions < requiredSulutions){
          sudokuGrid[row][column] = 0;
      }
    }
  };

  //Public
  return {
    print: function() {
      var horizontalSeparator = "-------------------------";
      console.log(horizontalSeparator);
      for (var i = 0; i < sudokuGrid.length; i++) {
        var row = sudokuGrid[i];
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
          console.log(horizontalSeparator);
        }
      }
    },
    solve: function() {
      solveRecursion(sudokuGrid,0,0);
    }
  };
};
