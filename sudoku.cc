#include <iostream>
#include "sudokuboard.h"
#include "stack.h"

using namespace std;

bool find_first(sudokuboard & board, size_t row, size_t col, char & num) {

	// find the first possible number to put in a give location on the 
	// board. return true and remember the number at that location if it
	// can be placed. if it cannot be placed there, return false

	for (char i = '1'; i <= '9'; i++) {
		if (board.canPlace(r, c, i))
			return true;
	}
	return false;
}

bool find_next(sudokuboard & board, size_t row, size_t col, char & num) {

	// given a specific location and a starting number, the function 
	// finds the next number that can be placed there. return false if 
	// there is no more number.
	
	for (char i = num + 1, i <= '9'; i++) {
		if (board.canPlace(r, c, i))
			return true;
	}
	return false;
}

bool is_most_constrained(sudokuboard & board, size_t & r, size_t & c) {

	// return true if the function can find a location on the board 
	// that has the fewest options possible. return false if we can't 
	// place any numbers in any empty space.

	size_t count = 0;
	size_t smallest_count = 9;
	for (size_t row = 0; row < 9; row++) {
		for (size_t col = 0; col < 9; col++) {
			if (board.get(r, c) == '_') {
				for (char num = '1'; num <= '9'; num++) {
					if (board.canPlace(row, col, num))
						count++;
				}
				if (count < smallest_count) {
					smallest_count = count;
					r = row;
					c = col;
				}
				count = 0;
			}
		}
	}	
	return smallest_count > 0;
}

void backtrack(sudokuboard & board, stack & s) {

	// backtrack: go to stack and undo the last moves  to try on other
	// possible options

	if (s.empty())
		return;
	size_t col; size_t row; char num;
	while(not s.empty()) {
		col = s.top();
		s.pop();
		row = s.top();
		s.pop();
		num = board.get(row, col);
		board.remove(row, col);
		if (find_next(board, row, col, num)) {
			board.place(row, col, num);
			s.push(row);
			s.push(col);
			return;
		}
	}
}

void solve(sudokuboard & board, stack & s) {

	// solve the sudoku board by first finding the location with fewest
	// options then try them on. If that doesn't work, backtrack.
	// repeat until the board is filled.

	size_t row = 0;
	size_t col = 0;
	char num = '1';
	while (not board.solved()) {
		if (is_most_constrained(board, row, col)) {
			if (find_first(board, row, col)) {
				board.place(row, col);
				s.push(col);
				s.push(row);
			}
		}
		else 
			backtrack(board, s);
	}
}

int main() {
	sudokuboard board;
	stack s;
	board.init();
	solve(board, s);
	if (board.solved())
		board.print();
}