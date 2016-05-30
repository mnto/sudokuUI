#include <stdio.h>
typedef size_t Element;

struct node {
	Element data;
	node *next;
	node (Element d, node *n) {
		data = d;
		next = n;
	}
};

class stack {
public
	stack();
	void push(const Element & item);
	void pop();
	Element top() const;
	bool empty() const;
private:
	node *_top;
	void _init();
};