#include "sudokuboard.h"
#include <iostream>

sudokuboard::sudokuboard() {

	// set up an empty board, which is a list of 9 strings,
	// each string has length of 9 to simulate a sudoku board.

	_size = 9; 
	for (size_t i = 0; i < _size; i++)
		_board[i] = "_________";
}

void sudokuboard::init() {

	// set up a sudoku board based on what is given in the input file

	string row = "";
	for (size_t i = 0; i < 9; i++) {
		cin >> row;
		_board[i] = row;
	}
}

void sudokuboard::print() const {

	// print the board

	for (size_t i = 0; i < 9; i++) {
		std::cout << _board[i] << endl;
	}
}

void sudokuboard::place(size_t r, size_t c, char n) {

	// place a number at a specified location on the sudoku board

	_board[r][c] = n;
}

int sudukuboard::get(size_t r, size_t c) const {

	// get value of a specified location on the board

	return _board[r][c];
}

void sudokuboard::remove(size_t r, size_t c) {

	// remove a number out of a specified location on the board

	_board[r][c] = '_';
}

bool sudokuboard::canPlace(size_t r, size_t c, char n) const {

	// return true if a certain number can be placed in a specified 
	// location. only true when that number is not present in a 3x3 square
	// or in its row or column. return false otherwise or if that location
	// is occupied already.

	if (_board[r][c] != '_') 
		return false;
	else {
		// check inside square
		size_t top_row = r / 3 * 3;
		size_t top_col = c / 3 * 3;
		for (size_t row = top_row; row < top_row + 3; row++) {
			for (size_t col = top_col; col < top_col + 3; col++) {
				if (_board[row][col] == n)
					return false;
			}
		}

		// check row
		for (size_t col = c; col < 9; col++) {
			if (_board[r][col] == n)
				return false;
		}
		
		// check col
		for (size_t row = r; row < 9; row++) {
			if (_board[row][c] == n)
				return false;
		}
		return true;
	}	
}

bool sudokuboard::solved() const {

	// return true if the board is solved, meaning all spots are filled
	
	for (size_t r = 0; r < 9; r++) {
		for (size_t c = 0; c < 9; c++){
			if (_board[r][c] == '_')
				return false;
		}
	}
	return true;
}