 module.exports = function Sudoku(sudokuToSolve){

   //Private variables
   var grid = sudokuToSolve;

   //Private functions
   var printTheSecret = () => {
     console.log("secret");
   };

   //Public
   return {
     print: function(){
       var horizontalSeparator = "-------------------------";
       console.log(horizontalSeparator);
       for(var i = 0; i < grid.length; i++){
         var row = grid[i];
         var rowString = "| ";
         for(var j = 0; j < row.length; j++){
           var cell = row[j];
           rowString += (cell + " ");
           if((j+1)%3 === 0){
             rowString += "| ";
           }
         }
         console.log(rowString);
         if((i+1)%3 === 0){
           console.log(horizontalSeparator);
         }
       }
     },
     solve: function(){
       console.log("solved!");
     }
   };
 };
