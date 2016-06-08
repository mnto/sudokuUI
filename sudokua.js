function draw() {
	var size = document.getElementsByClassName("size")[0].value;
	//var size = Math.pow(input, 2);
	var board = document.getElementsByClassName("board");
	// console.log(size);
	// validate input
	for (i = 0; i <document.getElementsByClassName("size").length; i++) {
		if (document.getElementsByClassName("size")[i].value < 1
		|| document.getElementsByClassName("size")[i].value > 5)
			alert("Invalid input");
	}
	var txt = "";
	for (i = 0; i < size * size; i++) {
		txt += "<div class='line'>";
		for (j = 0; j < size * size; j++) {
			txt += "<div class='square'> \
			<input type='text' class='num' onkeypress='return checkInput(event, this)'></div>";
		}
		txt += "</div>";
	}
	board[0].innerHTML = txt;
	setSize(Number(size));
	drawBorder(Number(size));
	transform(Number(size), "main diagonal");
	//setUpBoard();
}

function transform() {
	var rootGrid1 = [[1,2,3,4,5,6,7,8,9],
					 [4,5,6,7,8,9,1,2,3],
				 	 [7,8,9,1,2,3,4,5,6],
					 [2,3,4,5,6,7,8,9,1],
					 [5,6,7,8,9,1,2,3,4],
					 [8,9,1,2,3,4,5,6,7],
				 	 [3,4,5,6,7,8,9,1,2],
					 [6,7,8,9,1,2,3,4,5],
					 [9,1,2,3,4,5,6,7,8]],
	temp,
	currentSolution = [],
	dir = direction,
	tempList;
	for (var i = 0; i < arguments.lenght; i++) {
		if (arguments[i] ==  "vertical") {
			for (r = 0; r < 9; r++) {
				tempList = rootGrid1[r];
				for (c = 0; c < 4; c++) {
					temp = tempList[c];
					//console.log(temp);
					tempList[c] = tempList[8 - c];
					//console.log(tempList[8-c]);
					tempList[8-c] = temp;
				}
				console.log(tempList);
				currentSolution.push(tempList);
			}
		}
		else if (arguments[i]  == "horizontal") {
			for (r = 0; r < 4; r++) {
				tempList = rootGrid1[r];
				tempList2 = rootGrid1[8 - r];
				for (c = 0; c < 9; c++) {
					temp = tempList[c];
					//console.log(temp);
					tempList[c] = tempList2[c];
					tempList2[c] = temp;
					//console.log(tempList[8-c]);
				}
				currentSolution.splice(r, 0, tempList);
				currentSolution.splice(currentSolution.length - r, 0, tempList2);
			}
			currentSolution.splice(4, 0, rootGrid1[4]);
		}
		else if (arguments[i] == "main diagonal") {
			for (r = 0; r < 9; r++) {
				tempboard = rootGrid1;
				for (c = 0; c < 9; c++) {
					if(c > r) {
						temp = tempboard[r][c];
						tempboard[r][c] = tempboard[c][r];
						tempboard[c][r] = temp;
					}
				}
				currentSolution.push(tempboard[r]);
				console.log(currentSolution[r]);
			}
		}
		else if (arguments[i] == "swap two rows") {
			tempboard = rootGrid1;
			for (r = 0; r < 9; r++) {
				for (c = 0; c < 9; c++) {
					if (r == 0) {
						tempList = rootGrid1[r];
						tempboard[r][c] = tempboard[2][c];
						tempboard[2][c] = tempList[c];
					}
				}
			}
		}
	}
	
}


function setSize(size) {
	/* ------Reset width for bigger size so that player can see the whole board--------*/
	var width, height;
	if (size >= 1 && size <= 3) {
		width = String(50 * size * size + 3 * (size - 1) + size * size - size) + "px";
		height = "50px";
	}
	else {
		width = String(25 * size * size + 2 * (size - 1) + size * size - size) + "px";
		height = "25px";
	}

	for (i = 0; i < document.getElementsByClassName("line").length; i++) {
		document.getElementsByClassName("line")[i].style.width = width;
		document.getElementsByClassName("line")[i].style.height = height;
	}
}

function drawBorder(size) {
	var parent = document.getElementsByClassName("line");
	var i = size - 1;
	while (i < size * size - 1) {
		for (j = 0; j < size * size; j++) {
			parent[j].getElementsByClassName("square")[i].style.borderRight = "3px solid black";
		}
		document.getElementsByClassName("line")[i].style.borderBottom = "3px solid black";
		i = i + size;
	}
}

function checkInput(e, self) {
	var keynum;
	var rowList = getRow(self);
	var squareList = getSquare(self);

    if(window.event) { // IE                    
      	keynum = e.keyCode; 
    } 

    else if(e.which){ // Netscape/Firefox/Opera                   
        keynum = e.which;
    }

    var input = String.fromCharCode(keynum); 
    var colList = getCol(self);

	if (rowList.indexOf(input) !== -1
		|| colList.indexOf(input) !== -1 
		|| squareList.indexOf(input) !== -1  || input.length > 1 ) {
		self.style.color = "red";
		console.log("Invalid input");
	}

	else
		self.style.color = "black";
}

function getRow(self) {
	var parent = self.parentElement.parentElement,					// line
	row = [],
	val;

	for (i = 0; i < parent.getElementsByClassName("num").length; i++) {
		val = parent.getElementsByClassName("num")[i].value;
		if (val){
			row.push(val);
		}
	}

	return row;
}

function getCol(self) {
	var parent = self.parentElement.parentElement, 					// line 
	grandparent = parent.parentElement, 							// board
	squareList = Array.prototype.slice.call(parent.children), 		// list of squares in line
	index = squareList.indexOf(self.parentElement), 				// index of self-square
	col = [],
	val,
	lineList = grandparent.getElementsByClassName("line");			// list of all lines in board	
	
	for (i = 0; i < lineList.length; i++) {
		val = lineList[i].getElementsByClassName("num")[index].value;
		if (val){
			col.push(val);
		}
	}
	
	return col;
}

function getSquare(self) {
	var parent = self.parentElement.parentElement, 					// line
	grandparent = parent.parentElement, 							// board
	square = [],
	val,
	lineList = Array.prototype.slice.call(grandparent.children), 	// list of lines
	rowNum = lineList.indexOf(parent), 								// index of row
	squareList = Array.prototype.slice.call(parent.children), 		// list of squares in line
	colNum = squareList.indexOf(self.parentElement), 				// index of self-square
	topRow = Math.floor(rowNum / 3) * 3;
	topCol = Math.floor(colNum / 3) * 3;

	for (i = topRow; i < topRow + 3; i++) {
		for (j = topCol; j < topCol + 3; j++) {
			val = lineList[i].getElementsByClassName("num")[j].value;			
			if (val)
				square.push(val);
		}	
	}	

	return square;
}

function checkAnswer() {
	var solved = true,
	lineList = document.getElementsByClassName("line"); 	// list of lines

	for (r = 0; r < 9; r++) {
		for (c = 0; c < 9; c++) {
			if (lineList[r].getElementsByClassName("num")[c].style.color == "red"
				|| !lineList[r].getElementsByClassName("num")[c].value)
				solved =  false;
		}
	}
	if (solved)
		document.getElementById("result").innerHTML = "Correct!";
	else
		document.getElementById("result").innerHTML = "Incorrect solution";
}