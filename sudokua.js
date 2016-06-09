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
	var solution = transform();
	writeSolutionToBoard(solution);
	removeCells();
}

function transform() {
	var rootGrid1 = [[6,7,1,4,2,8,3,9,5],
					 [2,5,4,3,6,9,7,8,1],
				 	 [9,3,8,1,5,7,6,2,4],
					 [5,8,9,6,3,4,1,7,2],
					 [3,1,6,8,7,2,4,5,9],
					 [7,4,2,5,9,1,8,3,6],
					 [8,2,5,7,4,6,9,1,3],
				 	 [1,6,3,9,8,5,2,4,7],
					 [4,9,7,2,1,3,5,6,8]],
	rootGrid2 = [[5,8,7,1,2,3,9,6,4],
				 [9,2,3,4,8,6,1,5,7],
				 [1,4,6,9,5,7,3,8,2],
				 [8,5,9,2,3,1,4,7,6],
				 [3,6,2,5,7,4,8,9,1],
				 [7,1,4,8,6,9,2,3,5],
				 [2,7,1,3,9,5,6,4,8],
				 [6,9,8,7,4,2,5,1,3],
				 [4,3,5,6,1,8,7,2,9]],
	rootGrid3 = [[2,5,8,4,1,3,6,7,9],
				 [6,1,3,5,9,7,8,2,4],
				 [9,7,4,2,6,8,1,3,5],
				 [7,6,5,8,2,4,9,1,3],
				 [8,9,2,1,3,5,7,4,6],
				 [3,4,1,6,7,9,2,5,8],
				 [1,3,9,7,5,6,4,8,2],
				 [4,2,6,3,8,1,5,9,7],
				 [5,8,7,9,4,2,3,6,1]],
	allGrids = [rootGrid1, rootGrid2, rootGrid3],
	currentSolution = allGrids[Math.floor((Math.random () * 2) + 0)],
	
	transformations = ["vertical", "horizontal", "main diagonal", 
							"swap two rows", "swap two columns", "swap row groups",
							"swap col groups", "none"],
	howManyTimes = Math.floor((Math.random() * 10) + 0); // number of transformations from 0 - 10

	for (var i = 0; i < howManyTimes; i++) {
		index = Math.floor((Math.random() * (transformations.length - 1)) + 0); // random index in transformations
		if (transformations[index] ==  "vertical") {
			for (r = 0; r < 9; r++) {
				for (c = 0; c < 4; c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[r][8 - c];
					currentSolution[r][8 - c] = temp;
				}
			}
		}
		else if (transformations[index]  == "horizontal") {
			for (r = 0; r < 4; r++) {
				for (c = 0; c < 9; c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[8 - r][c];
					currentSolution[8 - r][c] = temp;
				}
			}
		}
		else if (transformations[index] == "main diagonal") {
			for (r = 0; r < 9; r++) {
				for (c = 0; c < 9; c++) {
					if(c > r) {
						temp = currentSolution[r][c];
						currentSolution[r][c] = currentSolution[c][r];
						currentSolution[c][r] = temp;
					}
				}
			}
		}
		else if (transformations[index] == "swap two rows") {
			for (r = 0; r < 9; r++) {
				for (c = 0; c < 9; c++) {
					if (r == 0 || r == 3 || r == 6) {
						temp = currentSolution[r][c];
						currentSolution[r][c] = currentSolution[r + 2][c];
						currentSolution[r + 2][c] = temp;
					}
				}
			}
		}

		else if (transformations[index] == "swap two columns") {
			for (r = 0; r < 9; r++) {
				for (c = 0; c < 9; c++) {
					if (c == 0 || c == 3 || c == 6) {
						temp = currentSolution[r][c];
						currentSolution[r][c] = currentSolution[r][c + 2];
						currentSolution[r][c + 2] = temp;		
					}
				}
			}
		}
		else if (transformations[index] == "swap row groups") {
			for (r = 3; r < 6; r++) {
				for (c = 0; c < 9; c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[r + 3][c];
					currentSolution[r + 3][c] = temp;
				}
			}
		}
		else if (transformations[index] == "swap col groups") {
			for (r = 0; r < 9; r++) {
				for (c = 3; c < 6; c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[r][c + 3];
					currentSolution[r][c + 3] = temp;
				}
			}
		}
	}
	return currentSolution;
}

function writeSolutionToBoard(solution) {
	for (r = 0; r < 9; r++) {
		for (c = 0; c < 9; c++) {
			x = document.getElementsByClassName("line")[r];
			x.getElementsByClassName("num")[c].value = solution[r][c];
			x.getElementsByClassName("num")[c].disabled = true;
		}
	}
}

function removeCells() {
	var numDelete = Math.floor((Math.random() * 15) + 60); // between 50 and 60
	for (i = 0; i < numDelete; i++) {
		randPos = Math.floor((Math.random() * 81) + 0);
		//console.log(randPos);
		row = Math.floor(randPos / 9);
		col = Math.floor(randPos % 9);
		// console.log(row);
		// console.log(col);
		x = document.getElementsByClassName("line")[row];
		// console.log(document.getElementsByClassName("line")[row]);
		x.getElementsByClassName("num")[col].disabled = false;
		x.getElementsByClassName("num")[col].value = '';
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