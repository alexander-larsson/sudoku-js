 module.exports = function Sudoku(sudokuGrid) {

     //Private variables
     // var sudokuGrid = sudokuGridToBeSolved;

     // Se upp för problem med att siffran redan finns eftersom jag själv
     // stoppat in den i backtracking algorithmen, dessa functioner kollar
     // alla värden.

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
         var squareSize = 3;
         var squareCornerRow = row - row % squareSize;
         var squareCornerColumn = column - column % squareSize;

         for (var i = squareCornerRow; i < squareCornerRow + squareSize; i++) {
             for (var j = squareCornerColumn; j < squareCornerColumn + squareSize; j++) {
                 if (grid[i][j]) === value) {
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
         console.log("solved!");
     }
 };
 };
