#include "stack.h"

stack::stack() {
	// init an empty stack
	_init();
}

void stack::_init() {
	_top = NULL;
}

void stack::push(const Element & item) {
	// push data on top of the stack
	node *baby = new node(item, _top);
	_top = baby;
}

void stack::pop() {
	// remove the data on top
	node *old = _top;
	_top = _top->next;
	delete old;
}

Element stack::top() const {
	// return the data of the top one
	return _top->data;
}

bool stack::empty() const {
	// return true if the stack is empty, false otherwise
	return _top == NULL;
}