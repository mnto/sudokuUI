var solution;
var size;
var width, height, widthSize, heightSize;
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
	root2 = [[4,1,2,3],
			 [3,2,1,4],
			 [1,3,4,2],
			 [2,4,3,1]],
	root4 = [[7,15,14,10,3,16,4,12,9,13,5,2,11,8,6,1],
			 [6,11,13,1,5,14,9,2,16,4,15,8,10,7,3,12],
			 [16,12,5,8,11,13,6,15,3,1,10,7,9,4,2,14],
			 [3,4,2,9,8,7,10,1,12,6,11,14,13,5,15,16],
			 [2,7,10,15,12,3,5,6,4,11,8,16,14,1,13,9],
			 [9,1,12,4,2,11,14,16,7,5,6,13,8,3,10,15],
			 [5,14,3,6,9,1,13,8,10,15,2,12,16,11,4,7],
			 [13,16,8,11,10,4,15,7,1,14,9,3,6,12,5,2],
			 [15,13,11,12,16,6,7,4,14,9,3,5,2,10,1,8],
			 [1,10,6,7,14,5,2,13,11,8,16,15,3,9,12,4],
			 [14,5,9,3,15,8,12,11,2,10,1,4,7,6,16,13],
			 [8,2,4,16,1,10,3,9,13,7,12,6,5,15,14,11],
			 [10,9,7,5,6,12,1,14,15,2,13,11,4,16,8,3],
			 [11,3,16,14,13,9,8,10,6,12,4,1,15,2,7,5],
			 [12,6,15,13,4,2,16,5,8,3,7,9,1,10,11,10],
			 [4,8,1,2,7,15,11,3,5,16,14,10,12,13,9,6]],
	root5 = [[1,11,4,20,25,24,19,15,17,10,21,8,18,14,22,6,12,9,3,16,2,7,13,23,5],
			 [5,2,19,23,24,8,22,12,9,3,16,6,7,20,17,18,21,25,14,13,10,11,4,1,15],
			 [17,14,9,6,3,25,21,5,7,20,11,10,2,1,13,4,8,24,23,15,18,12,16,22,19],
			 [16,7,21,8,18,4,2,13,11,23,5,19,15,24,12,10,20,17,22,1,9,6,25,14,3],
			 [10,13,15,12,22,14,1,18,6,16,23,9,25,4,3,7,5,19,11,2,8,24,20,21,17],
			 [12,1,11,10,6,5,13,23,24,15,7,16,8,17,21,25,19,3,4,9,22,14,2,20,18],
			 [8,19,13,21,9,16,4,25,12,2,15,3,5,11,20,14,17,23,18,22,1,10,7,24,6],
			 [4,17,14,18,7,9,3,22,21,19,25,1,24,2,23,5,13,20,10,6,16,15,8,11,12],
			 [22,3,24,15,23,18,20,11,1,7,10,13,4,6,14,16,2,12,21,8,5,19,17,25,9],
			 [20,16,2,25,5,10,8,6,14,17,9,22,12,18,19,1,11,15,7,24,3,23,21,13,4],
			 [13,25,3,5,10,2,23,14,4,18,22,15,17,19,24,20,7,1,9,21,12,16,6,8,11],
			 [14,23,1,24,12,19,16,8,15,6,2,7,20,25,10,3,4,13,17,11,21,9,5,18,22],
			 [7,8,18,11,17,20,24,21,22,9,3,4,1,12,16,2,6,14,19,5,25,13,15,10,23],
			 [2,22,16,9,21,17,11,7,10,25,8,5,14,13,6,12,24,18,15,23,19,4,1,3,20],
			 [6,15,20,19,4,13,12,3,5,1,18,11,23,21,9,8,22,16,25,10,7,17,24,2,14],
			 [21,18,12,2,16,7,10,19,3,13,1,24,22,9,4,11,15,6,20,14,17,8,23,5,25],
			 [9,24,8,13,1,6,25,4,20,12,17,14,3,7,18,23,16,22,5,19,11,21,10,15,2],
			 [23,10,22,7,15,21,5,9,18,14,6,20,16,8,11,17,1,2,13,25,4,3,19,12,24],
			 [25,5,6,14,11,1,17,2,8,24,13,21,19,23,15,9,3,10,12,4,20,18,22,16,7],
			 [3,20,17,4,19,22,15,16,23,11,12,25,10,5,2,21,18,8,24,7,6,1,14,9,13],
			 [19,6,23,22,8,15,18,1,25,4,14,2,9,3,7,13,10,11,16,20,24,5,12,17,21],
			 [15,4,5,17,14,3,7,24,19,8,20,23,11,10,25,22,9,21,1,12,13,2,18,6,16],
			 [11,12,7,16,20,23,6,17,2,21,24,18,13,15,1,19,25,5,8,3,14,22,9,4,10],
			 [18,9,25,1,2,11,14,10,13,22,4,12,21,16,5,24,23,7,6,17,15,20,3,19,8],
			 [24,21,10,3,13,12,9,20,16,5,19,17,6,22,8,15,14,4,2,18,23,25,11,7,1]];
function draw() {
	size = Number(document.getElementsByClassName("size")[0].value);
	width = height = size * size;
	//var size = Math.pow(input, 2);
	var board = document.getElementById("board");
	var valid = true;
	// console.log(size);
	// validate input
	reset();
	for (i = 0; i <document.getElementsByClassName("size").length; i++) {
		if (document.getElementsByClassName("size")[i].value < 1
		|| document.getElementsByClassName("size")[i].value > 5) {
			alert("Invalid input");
			valid = false;
			// break;
		}
	}
	if (valid) {
		console.log('true');
		board.style.position = "static";
		board.innerHTML = drawOutlineToHTML();
		board.innerHTML += "<div><button id='button' onclick='checkAnswer()'>Finish</button> \
							<p id='result'></p> \
							<button id='solButton' onclick='showHideSolution(this)'>Show Solution</button></div>";

		setSize();
		drawBorder("board");
		solution = transform(size);
		// ----------------console solution---------------------
		// for (r = 0; r < width; r++) {
		// 	console.log(solution[r]);
		// }
		// console.log("<br>");
		// -----------------------------------------------------
		writeSolutionToBoard(solution, "board");
		removeCells();
	}
}

function reset() {
	document.getElementById("board").innerHTML = "";
	document.getElementById("solution").innerHTML = "";
}
function size() {
	return document.getElementsByClassName("size")[0].value;
}

function getSolution() {
	return solution;
}
function drawOutlineToHTML() {
	var txt = "";
	for (i = 0; i < width; i++) {
		txt += "<div class='line'>";
		for (j = 0; j < height; j++) {
			txt += "<div class='square'> \
			<input type='text' class='num' onkeypress='return checkInput(event, this)'></div>";
		}
		txt += "</div>";
	}
	return txt;
}

function transform(size) {
	var transformations = ["vertical", "horizontal", "main diagonal"];
	var howManyTimes = Math.floor((Math.random() * 10) + 3); // number of transformations from 3 - 13
	var currentSolution = [];
	console.log("Number of transformations: " + howManyTimes);
	if (size == 2) {
		currentSolution = root2;
		//console.log(currentSolution);
	}
	else if (size == 3) {
		transformations.push("swap two rows", "swap two columns", "swap row groups",
							"swap col groups", "none");
		allGrids3 = [rootGrid1, rootGrid2, rootGrid3],
		currentSolution = allGrids3[Math.floor((Math.random () * 2) + 0)];
	}
	else if (size == 4) {
		currentSolution = root4;
	}
	else {
		currentSolution = root5;
	}

	for (var i = 0; i < howManyTimes; i++) {
		index = Math.floor((Math.random() * (transformations.length - 1)) + 0); // random index in transformations
		if (transformations[index] ==  "vertical") {
			for (r = 0; r < width; r++) {
				for (c = 0; c < Math.floor(height / 2); c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[r][width - 1 - c];
					currentSolution[r][width - 1 - c] = temp;
				}
			}
		}
		else if (transformations[index]  == "horizontal") {
			for (r = 0; r < Math.floor(width / 2); r++) {
				for (c = 0; c < height; c++) {
					//console.log(currentSolution);
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[width - 1 - r][c];
					currentSolution[width - 1 - r][c] = temp;
				}
			}
		}
		else if (transformations[index] == "main diagonal") {
			for (r = 0; r < width; r++) {
				for (c = 0; c < height; c++) {
					if(c > r) {
						temp = currentSolution[r][c];
						currentSolution[r][c] = currentSolution[c][r];
						currentSolution[c][r] = temp;
					}
				}
			}
		}
		else if (transformations[index] == "swap two rows") {
			for (r = 0; r < width; r++) {
				for (c = 0; c < height; c++) {
					if (r == 0 || r == 3 || r == 6) {
						temp = currentSolution[r][c];
						currentSolution[r][c] = currentSolution[r + 2][c];
						currentSolution[r + 2][c] = temp;
					}
				}
			}
		}

		else if (transformations[index] == "swap two columns") {
			for (r = 0; r < width; r++) {
				for (c = 0; c < height; c++) {
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
				for (c = 0; c < width; c++) {
					temp = currentSolution[r][c];
					currentSolution[r][c] = currentSolution[r + 3][c];
					currentSolution[r + 3][c] = temp;
				}
			}
		}
		else if (transformations[index] == "swap col groups") {
			for (r = 0; r < width; r++) {
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

function writeSolutionToBoard(solution, parentName) {
	var parent = document.getElementById(parentName);
	for (r = 0; r < width; r++) {
		for (c = 0; c < height; c++) {
			x = parent.getElementsByClassName("line")[r];
			x.getElementsByClassName("num")[c].value = solution[r][c];
			x.getElementsByClassName("num")[c].disabled = true;
		}
	}
}

function removeCells() {
	if (size == 1) {
		//console.log('1');
		document.getElementsByClassName("line")[0].getElementsByClassName("num")[0].value = '';
		document.getElementsByClassName("line")[0].getElementsByClassName("num")[0].disabled = false;
	}
	else {
		var boardsize = Math.pow(size, 4);
		var upperLimit = Math.floor(boardsize/9 * 8); //8/9
		var lowerLimit = Math.floor(boardsize/9 * 6); //6/9
		var range = upperLimit - lowerLimit;
		var numDelete = Math.floor((Math.random() * range) + lowerLimit); 
		for (i = 0; i < numDelete; i++) {
			randPos = Math.floor((Math.random() * boardsize) + 0);
			//console.log(randPos);
			row = Math.floor(randPos / width);
			col = Math.floor(randPos % height);
			// console.log(row);
			// console.log(col);
			x = document.getElementsByClassName("line")[row];
			// console.log(document.getElementsByClassName("line")[row]);
			x.getElementsByClassName("num")[col].disabled = false;
			x.getElementsByClassName("num")[col].value = '';
		}
	}
}

function setSize() {
	/* ------Reset width for bigger size so that player can see the whole board--------*/
	if (size >= 1 && size <= 3) {
		widthSize = 50 * width + 3 * (size - 1) + width - size ;
		heightSize = 50;
	}
	else {
		widthSize = 25 * width + 2 * (size - 1) + width - size;
		heightSize = 25;
	}

	for (i = 0; i < document.getElementsByClassName("line").length; i++) {
		document.getElementsByClassName("line")[i].style.width = String(widthSize + "px");
		document.getElementsByClassName("line")[i].style.height = String(heightSize + "px");
	}
}

function drawBorder(parentName) {
	var parent = document.getElementById(parentName).getElementsByClassName("line");
	var i = size - 1;
	//console.log(size);
	while (i < width - 1) {
		for (j = 0; j < height; j++) {
			parent[j].getElementsByClassName("square")[i].style.borderRight = "3px solid black";
		}
		parent[i].style.borderBottom = "3px solid black";
		i = i + size;
		//console.log(i);
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
		alert("Invalid input");
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
	topRow = Math.floor(rowNum / size) * size;
	topCol = Math.floor(colNum / size) * size;

	for (i = topRow; i < topRow + size; i++) {
		for (j = topCol; j < topCol + size; j++) {
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

	for (r = 0; r < width; r++) {
		for (c = 0; c < height; c++) {
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

function showHideSolution(self) {
	//draw();

	var board = document.getElementById("board");
	var solutionboard = document.getElementById("solution");
	if (document.getElementById("solButton").innerHTML == "Show Solution") {
		document.getElementById("solButton").innerHTML = "Hide Solution";
		board.style.transform = "translateY(50px)";
		board.style.left = "200px";
		//var xVal = 1912 - Number(widthSize) - 200;
		//console.log(xVal);
		solutionboard.style.transform = "translateY(50px)";
		solutionboard.style.right = "200px";
		board.style.marginBottom = solutionboard.style.marginBottom = "50px";
		board.style.position = solutionboard.style.position = "absolute";
		solutionboard.innerHTML = drawOutlineToHTML();
		setSize();
		//console.log(document.getElementsByClassName("line")[0].parentElement);
		drawBorder("solution");
		writeSolutionToBoard(solution, "solution");
		//document.getElementById("enter").disabled = true;
	}
	else {
		self.innerHTML = "Show Solution";
		solutionboard.innerHTML = "";
		board.style.transform = solutionboard.style.transform = "none";
		board.style.position = "static";
		//document.getElementById("enter").disabled = false;
	}

}
