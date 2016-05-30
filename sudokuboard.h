#include <cstdlib>
#include <string>

using namespace std;

class sudokuboard {
public:
	sudokuboard();
	void _init();
	void print() const;
	void place(size_t r, size_t c, char n);
	int get(size_t r, size_t c) const
	void remove(size_t r, size_t c);
	bool canPlace(size_t r, size_t c, char n) const;
	bool solved() const;
private:
	sudokuboard(const sudokuboard &);
	string _board[9];
	size_t size;
	char _data;
}