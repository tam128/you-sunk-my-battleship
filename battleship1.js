// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
var gridnum=1;
var clicked=0;
var turn=1;

//var reg = /^(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\3(?:\d|10))|(?:[A-J]\4))(?(2)\))\s*;\s*)(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\7(?:\d|10))|(?:[A-J]\8))(?(6)\))\s*;\s*)(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\11(?:\d|10))|(?:[A-J]\12))(?(6)\))\s*);*/g;
var regA = /((A\s*:\s*)|(A\s*\(\s*))[A-J](\d|10)\s*-\s*[A-J](\d|10)\)*/g;
var pos = /[A-J](\d|10)\s*/g;
var letter = /[A-J]/g; 
var PBtn = document.getElementById("PBtn");

var Player1={
	name: "",
	AShip: 5,
	BShip: 4,
	SShip: 3
};

var Player2={
	name: "",
	AShip: 5,
	BShip: 4,
	SShip: 3
};

var tBoard1 = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,1,1,1,1,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]
				
var tBoard2 = [
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,1],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]



if(clicked==0){
	if (PBtn.addEventListener){
		PBtn.addEventListener("click", P1Button, false);
	}
	else if (PBtn.attachEvent){
		PBtn.attachEvent('onclick', P1Button);
	}
}

function P1Button(){
	var P1Name=document.getElementById("PName").value;
	var P1Ships=document.getElementById("PShips").value;
	var found = P1Ships.search(reg);
	if(found==-1){
		alert("Ship location format is invalid. Please enter a valid location");
	}
	
	/*else if(found!=-1 && clicked<1){
		alert("hi");
	}*/
	else{
		var player=document.getElementById("Player").innerHTML="Player 2";
		var p2=document.getElementById("Player").style.color="#d31323";
		//var PName=document.getElementById("PName").value="";
		//var PShips=document.getElementById("PShips").value="";
		
		clicked=1;
			
		if (PBtn.addEventListener){
			PBtn.addEventListener("click", P2Button, false);
		}
		else if (PBtn.attachEvent){
			PBtn.attachEvent('onclick', P2Button);
		}		
	}
}

		
function P2Button(){
	var P2Name=document.getElementById("PName").value;
	var P2Ships=document.getElementById("PShips").value;
	var found = P2Ships.search(reg);
	if(found==-1){
		alert("Ship location invalid. Please enter a valid location");
	}
	else{
		PBtn.disabled=true;
	}
}

// get the container element

	
	// Top board
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new div HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			grid1.appendChild(square);

		// give each div element a unique id based on its row and column, like "s00"
			square.id = 't' + j + i;			
			//var x = document.getElementByID("container").createElement("label");
			//container.appendChild(x);
			
			// set each grid square's coordinates: multiples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';						
		}
	}
	
	//Bottom board
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new div HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			grid2.appendChild(square);

		// give each div element a unique id based on its row and column, like "s00"
			square.id = 'b' + j + i;			
			//var x = document.getElementByID("container").createElement("label");
			//container.appendChild(x);
			
			// set each grid square's coordinates: multiples of the current row or column number
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			
			// use CSS absolute positioning to place each grid square on the page
			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';	
			
			if(tBoard1[j][i]==1){
				document.getElementById('b'+j+i).innerHTML = 'X';
			}			
		}
	}

document.getElementById("topPlayer").innerHTML="Player 2 (Opponent's Board)";
document.getElementById("bottomPlayer").innerHTML="Player 1's Ships";


// set event listener for all elements in gameboard, run fireTorpedo function when square is clicked
document.getElementById("grid1").addEventListener("click", makeMove, false);


	function switchBoard(){
		if(turn==0){
			document.getElementById("topPlayer").innerHTML="Player 1 (Opponent's Board)";
			document.getElementById("bottomPlayer").innerHTML="Player 2's Ships";
			tBoard = tBoard2;
			for (i = 0; i < cols; i++) {
				for (j = 0; j < rows; j++) {
					document.getElementById('b'+j+i).innerHTML="";
					document.getElementById('b'+j+i).style.background='#adfaff';
					if(tBoard[j][i]==3){
						document.getElementById('b'+j+i).style.background='#ffffff';
					} 	
					else if(tBoard[j][i]==2){
						document.getElementById('b'+j+i).style.background='#f43d3d';
						document.getElementById('b'+j+i).innerHTML="X";
					}
					else if(tBoard[j][i]==1){
						document.getElementById('b'+j+i).style.background='#adfaff';
						document.getElementById('b'+j+i).innerHTML="X";
					}
				}
			}
			
			tBoard = tBoard1;
			for (i = 0; i < cols; i++) {
				for (j = 0; j < rows; j++) {
					if(tBoard[j][i]==3){
						document.getElementById('t'+j+i).style.background='#ffffff';
					} 	
					else if(tBoard[j][i]==2){
						document.getElementById('t'+j+i).style.background='#f43d3d';
					}
					else{
						document.getElementById('t'+j+i).style.background='#adfaff';
					}
				}
			}
			document.getElementById("grid1").addEventListener("click", makeMove, false);
		}
		else{
			document.getElementById("topPlayer").innerHTML="Player 2 (Opponent's Board)";
			document.getElementById("bottomPlayer").innerHTML="Player 1's Ships";
			tBoard = tBoard2;
			for (i = 0; i < cols; i++) {
				for (j = 0; j < rows; j++) {
					if(tBoard[j][i]==3){
						document.getElementById('t'+j+i).style.background='#ffffff';
					} 	
					else if(tBoard[j][i]==2){
						document.getElementById('t'+j+i).style.background='#f43d3d';
					}
					else{
						document.getElementById('t'+j+i).style.background='#adfaff';
					}
				}
			}
			
			tBoard = tBoard1;
			for (i = 0; i < cols; i++) {
				for (j = 0; j < rows; j++) {
					document.getElementById('b'+j+i).innerHTML="";
					document.getElementById('b'+j+i).style.background='#adfaff';
					if(tBoard[j][i]==3){
						document.getElementById('b'+j+i).style.background='#ffffff';
					} 	
					else if(tBoard[j][i]==2){
						document.getElementById('b'+j+i).style.background='#f43d3d';
						document.getElementById('b'+j+i).innerHTML="X";
					}
					else if(tBoard[j][i]==1){
						document.getElementById('b'+j+i).style.background='#adfaff';
						document.getElementById('b'+j+i).innerHTML="X";
					}
				}
			}
			document.getElementById("grid1").addEventListener("click", makeMove, false);
		}
	}
	



function makeMove(e) {

	if(turn==1){
		var tBoard = tBoard2;
	}
	else {
		var tBoard = tBoard1;
	}
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
        //alert("Clicked on row " + row + ", col " + col);
				
		// if player clicks a square with no ship, change the color and change square's value
		if (tBoard[row][col] == 0) {
			e.target.style.background = '#cf76f2';
			// set this square's value to 3 to indicate that they fired and missed
			tBoard[row][col] = 3;
			
		// if player clicks a square with a ship, change the color and change square's value
		} else if (tBoard[row][col] == 1) {
			e.target.style.background = '#f43d3d';
			// set this square's value to 2 to indicate the ship has been hit
			tBoard[row][col] = 2;
					setTimeout(function() {
			if (window.confirm('Next player ready?'))
			{
				turn=turn+1;
				turn = turn%2;
				alert(turn);
				switchBoard();
			}
		}, 1000);
		
			// increment hitCount each time a ship is hit
			hitCount++;

			// this definitely shouldn't be hard-coded, but here it is anyway. lazy, simple solution:
			if (hitCount == 17) {
				alert("All enemy battleships have been defeated! You win!");
			}
			
		// if player clicks a square that's been previously hit, let them know
		} /*else if (tBoard[row][col] > 1) {
			alert("Stop wasting your torpedos! You already fired at this location.");
		}	*/	
		
		setTimeout(function() {
			if (window.confirm('Next player ready?'))
			{
				turn=turn+1;
				turn = turn%2;
				alert(turn);
				switchBoard();
			}
		}, 1000);
    }
    e.stopPropagation();
	
	
}



