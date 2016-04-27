# Sudoku-JS

A program with a CLI interface that can solve and generate sudokus.

## Usage

To solve a sudoku:
```
node sudoku-cli.js solve <file-path>
```
The file-path should point on a file that consists of 9 rows with 9 charachters on each row. The numbers 1-9 symbolize a number and all other charchters symbolize an empty box.

To generate a sudoku:
```
node sudoku-cli.js generate
```

The output of both these commands will be printed to the terminal. A zero in the sudoku grid represents an empty box.
