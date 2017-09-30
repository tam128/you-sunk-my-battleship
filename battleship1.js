// set grid rows and columns and the size of each square
var rows = 10;
var cols = 10;
var squareSize = 50;
var gridnum=1;
var turn=1;

//var reg = /^(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\3(?:\d|10))|(?:[A-J]\4))(?(2)\))\s*;\s*)(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\7(?:\d|10))|(?:[A-J]\8))(?(6)\))\s*;\s*)(?:([ABS])(?::|(\())\s*([A-J])(\d|10)\s*-\s*(?:(?:\11(?:\d|10))|(?:[A-J]\12))(?(6)\))\s*);*/g;
var PBtn = document.getElementById("PBtn");

var Player1={
	'name': "",
	'Alength': 5,
	'Blength': 4,
	'Slength': 3,
	'AStart': "",
	'BStart': "",
	'SStart': "",
	'AEnd': "",
	'BEnd': "",
	'SEnd': ""
};

var Player2={
	'name': "",
	'Alength': 5,
	'Blength': 4,
	'Slength': 3,
	'AStart': "",
	'BStart': "",
	'SStart': "",
	'AEnd': "",
	'BEnd': "",
	'SEnd': ""
};


var tBoard1 = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]
				
var tBoard2 = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]


document.getElementById("PBtn").addEventListener("click", P1Button, false);

function clearBoard(tBoard){
	
	if(tBoard==1){
		tBoard=tBoard1;
	}
	else if(tBoard==2){
		tBoard=tBoard2;
	}
	
	tBoard = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]
}

function P1Button(){
	var validA = false;
	var validB = false;
	var validS = false;
	Player1.name=document.getElementById("PName").value;
	var P1Ships=document.getElementById("PShips").value;
	var foundA = P1Ships.search(/((A\s*:\s*)|(A\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	var foundB = P1Ships.search(/((B\s*:\s*)|(B\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	var foundS = P1Ships.search(/((S\s*:\s*)|(S\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	if(foundA==-1 || foundB==-1 || foundS==-1){
		alert("Ship location format is invalid. Please enter a valid location");
	}
	else if(Player1.name ==""){
		alert("Please enter a name");
	}
	else{
		foundA = /((A\s*:\s*)|(A\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P1Ships);
		var startLetter = getCoord(foundA[4].charAt(0));
		var endLetter = getCoord(foundA[6].charAt(0));
		if((startLetter==endLetter) || (foundA[4].charAt(1)==foundA[6].charAt(1))){
			if( ((startLetter+Player1.Alength-1)==endLetter) || (parseInt(foundA[4].charAt(1))+Player1.Alength-1)==parseInt(foundA[6].charAt(1))){
				//alert("Valid");
				validA = true;
				Player1.AStart = foundA[4];
				Player1.AEnd = foundA[6];
				var nOverlap = populateBoard(parseInt(foundA[4].charAt(1))-1, parseInt(foundA[6].charAt(1))-1, startLetter, endLetter, "A", 1);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(1);
				}
			}
			else{
				alert("Length of ship is not valid");
				validA = false;
			}
		}
		else{
			alert("Not a valid location");
			validA = false;
		}
		
		foundB = /((B\s*:\s*)|(B\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P1Ships);
		var startLetter = getCoord(foundB[4].charAt(0));
		var endLetter = getCoord(foundB[6].charAt(0));
		if((startLetter==endLetter) || (foundB[4].charAt(1)==foundB[6].charAt(1))){
			if( ((startLetter+Player1.Blength-1)==endLetter) || (parseInt(foundB[4].charAt(1))+Player1.Blength-1)==parseInt(foundB[6].charAt(1))){
				//alert("Valid");
				validB = true;
				Player1.BStart = foundB[4];
				Player1.BEnd = foundB[6];
				var nOverlap = populateBoard(parseInt(foundB[4].charAt(1))-1, parseInt(foundB[6].charAt(1))-1, startLetter, endLetter, "B", 1);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(1);
				}
				
			}
			else{
				alert("Length of ship B is not valid");
				validB = false;
			}
		}
		else{
			alert("Not a valid location");
			validB = false;
		}
		
		foundS = /((S\s*:\s*)|(S\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P1Ships);
		var startLetter = getCoord(foundS[4].charAt(0));
		var endLetter = getCoord(foundS[6].charAt(0));
		if((startLetter==endLetter) || (foundS[4].charAt(1)==foundS[6].charAt(1))){
			if( ((startLetter+Player1.Slength-1)==endLetter) || (parseInt(foundS[4].charAt(1))+Player1.Slength-1)==parseInt(foundS[6].charAt(1))){
				//alert("Valid");
				validS = true;
				Player1.SStart = foundS[4];
				Player1.SEnd = foundS[6];
				var nOverlap = populateBoard(parseInt(foundS[4].charAt(1))-1, parseInt(foundS[6].charAt(1))-1, startLetter, endLetter, "S", 1);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(1);
				}
			}
			else{
				alert("Length of ship S is not valid");
				validS = false;
			}
		}
		else{
			alert("Not a valid location");
			validS = false;
		}
	}
	if(validA && validB && validS){
		var player=document.getElementById("Player").innerHTML="Player 2";
		var p2=document.getElementById("Player").style.color="#d31323";
		//var PName=document.getElementById("PName").value="";
		//var PShips=document.getElementById("PShips").value="";
		
		document.getElementById("PBtn").removeEventListener('click', P1Button, false);
		document.getElementById("PBtn").addEventListener("click", P2Button, false);	
	}
}

		
function P2Button(){
	var validA = false;
	var validB = false;
	var validS = false;
	Player2.name=document.getElementById("PName").value;
	var P2Ships=document.getElementById("PShips").value;
	var foundA = P2Ships.search(/((A\s*:\s*)|(A\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	var foundB = P2Ships.search(/((B\s*:\s*)|(B\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	var foundS = P2Ships.search(/((S\s*:\s*)|(S\s*\(\s*))([A-J])(\d|10)\s*-\s*([A-J])(\d|10)\)*/);
	if(foundA==-1 || foundB==-1 || foundS==-1){
		alert("Ship location format is invalid. Please enter a valid location");
	}
	else if(Player2.name ==""){
		alert("Please enter a name");
	}
	else{
		foundA = /((A\s*:\s*)|(A\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P2Ships);
		var startLetter = getCoord(foundA[4].charAt(0));
		var endLetter = getCoord(foundA[6].charAt(0));
		if((startLetter==endLetter) || (foundA[4].charAt(1)==foundA[6].charAt(1))){
			if( ((startLetter+Player2.Alength-1)==endLetter) || (parseInt(foundA[4].charAt(1))+Player2.Alength-1)==parseInt(foundA[6].charAt(1))){
				//alert("Valid");
				validA = true;
				Player2.AStart = foundA[4];
				Player2.AEnd = foundA[6];
				var nOverlap = populateBoard(parseInt(foundA[4].charAt(1))-1, parseInt(foundA[6].charAt(1))-1, startLetter, endLetter, "A", 2);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(2);
				}
			}
			else{
				alert("Length of ship is not valid");
				validA = false;
			}
		}
		else{
			alert("Not a valid location");
			validA = false;
		}
		
		foundB = /((B\s*:\s*)|(B\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P2Ships);
		var startLetter = getCoord(foundB[4].charAt(0));
		var endLetter = getCoord(foundB[6].charAt(0));
		if((startLetter==endLetter) || (foundB[4].charAt(1)==foundB[6].charAt(1))){
			if( ((startLetter+Player2.Blength-1)==endLetter) || (parseInt(foundB[4].charAt(1))+Player2.Blength-1)==parseInt(foundB[6].charAt(1))){
				//alert("Valid");
				validB = true;
				Player2.BStart = foundB[4];
				Player2.BEnd = foundB[6];
				var nOverlap = populateBoard(parseInt(foundB[4].charAt(1))-1, parseInt(foundB[6].charAt(1))-1, startLetter, endLetter, "B", 2);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(2);
				}
			}
			else{
				alert("Length of ship B is not valid");
				validB = false;
			}
		}
		else{
			alert("Not a valid location");
			validB = false;
		}
		
		foundS = /((S\s*:\s*)|(S\s*\(\s*))([A-J](\d|10))\s*-\s*([A-J](\d|10))\)*/.exec(P2Ships);
		var startLetter = getCoord(foundS[4].charAt(0));
		var endLetter = getCoord(foundS[6].charAt(0));
		if((startLetter==endLetter) || (foundS[4].charAt(1)==foundS[6].charAt(1))){
			if( ((startLetter+Player2.Slength-1)==endLetter) || (parseInt(foundS[4].charAt(1))+Player2.Slength-1)==parseInt(foundS[6].charAt(1))){
				//alert("Valid");
				validS = true;
				Player2.SStart = foundS[4];
				Player2.SEnd = foundS[6];
				var nOverlap = populateBoard(parseInt(foundS[4].charAt(1))-1, parseInt(foundS[6].charAt(1))-1, startLetter, endLetter, "S", 2);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(2);
				}
			}
			else{
				alert("Length of ship S is not valid");
				validS = false;
			}
		}
		else{
			alert("Not a valid location");
			validS = false;
		}
	}
	if(validA && validB && validS){
		PBtn.disabled=true;
		document.getElementById("PName").value="";
		document.getElementById("PShips").value="";
		document.getElementById("PBtn").removeEventListener('click', P2Button, false);
		alert("Click ok to begin " + Player1.name + "'s turn");
		initialize();
	}

}

function populateBoard(rowStart, rowEnd, colStart, colEnd, ship, tBoard){
	if(tBoard==1){
		tBoard = tBoard1;
	}
	else if(tBoard==2){
		tBoard = tBoard2;
	}
	for(i=colStart; i<=colEnd; i++){
		for(j=rowStart; j<=rowEnd; j++){
			if(tBoard[j][i]==0){
				tBoard[j][i]=ship;
			}
			else{
				return false;
			}
		}
	}
}

function getCoord(letter){
	switch(letter){
		case "A": 
			return 0;
			break;
		case "B": 
			return 1;
			break;
		case "C": 
			return 2;
			break;
		case "D": 
			return 3;
			break;
		case "E": 
			return 4;
			break;
		case "F": 
			return 5;
			break;
		case "G": 
			return 6;
			break;
		case "H": 
			return 7;
			break;
		case "I": 
			return 8;
			break;
		case "J": 
			return 9;
			break;
	}
}
// get the container element

function initialize(){	

	var t = document.getElementById("tletters").innerHTML="A&emsp;&emsp; B&emsp;&emsp;C&emsp;&emsp;D&emsp;&emsp;E&emsp;&emsp;F&emsp;&emsp;G&emsp;&emsp;H&emsp;&emsp;I&emsp;&emsp;J";
	var b = document.getElementById("bletters").innerHTML="A&emsp;&emsp; B&emsp;&emsp;C&emsp;&emsp;D&emsp;&emsp;E&emsp;&emsp;F&emsp;&emsp;G&emsp;&emsp;H&emsp;&emsp;I&emsp;&emsp;J";
	// Top board
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			// create a new div HTML element for each grid square and make it the right size
			var square = document.createElement("div");
			grid1.appendChild(square);

		// give each div element a unique id based on its row and column, like "s00"
			square.id = 't' + j + i;			
			
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
			
			if(tBoard1[j][i]=="A"){
				document.getElementById('b'+j+i).innerHTML = 'A';
			}			
			else if(tBoard1[j][i]=="B"){
				document.getElementById('b'+j+i).innerHTML = 'B';
			}
			else if(tBoard1[j][i]=="S"){
				document.getElementById('b'+j+i).innerHTML = 'S';
			}
		}
	}
	
	document.getElementById("topPlayer").innerHTML= Player2.name + " (" + Player1.name + "'s Target)";
	document.getElementById("bottomPlayer").innerHTML=Player1.name +"'s Ships";
	
	
}

document.getElementById("grid1").addEventListener("click", makeMove, false);


	function switchBoard(){
		if(turn==0){
			alert("Click OK to begin " + Player2.name + "'s turn");
			document.getElementById("topPlayer").innerHTML= Player1.name + " (" + Player2.name + "'s Target)";
			document.getElementById("bottomPlayer").innerHTML= Player2.name +"'s Ships";
			//Player 2's ships are on the bottom
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
					//mark the bottom ship locations for Player2
					else if(tBoard[j][i]=="A"){
						document.getElementById('b'+j+i).innerHTML = 'A';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}			
					else if(tBoard[j][i]=="B"){
						document.getElementById('b'+j+i).innerHTML = 'B';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}
					else if(tBoard[j][i]=="S"){
						document.getElementById('b'+j+i).innerHTML = 'S';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}
				}
			}
			

			//add colors showing Player2's hits and misses on Player1's board (top)
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
			alert("Click OK to begin " + Player1.name + "'s turn");
			document.getElementById("topPlayer").innerHTML=Player2.name + " (" + Player1.name + "'s Target)";
			document.getElementById("bottomPlayer").innerHTML=Player1.name +"'s Ships";
			
			//add colors showing Player1's hits and misses on Player2's board (top)
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
			
			//Player 1's ships are on the bottom
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
					//mark the bottom ship locations for Player1
					else if(tBoard[j][i]=="A"){
						document.getElementById('b'+j+i).innerHTML = 'A';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}			
					else if(tBoard[j][i]=="B"){
						document.getElementById('b'+j+i).innerHTML = 'B';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}
					else if(tBoard[j][i]=="S"){
						document.getElementById('b'+j+i).innerHTML = 'S';
						document.getElementById('b'+j+i).style.background='#adfaff';
					}
				}
			}
			
			document.getElementById("grid1").addEventListener("click", makeMove, false);
		}
	}
	



function makeMove(e) {
	if(turn==1){
		var tBoard = tBoard2;
		var player = Player1;
	}
	else {
		var tBoard = tBoard1;
		var player = Player2;
	}
    // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget)
	if (e.target !== e.currentTarget) {
        // extract row and column # from the HTML element's id
		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
        //alert("Clicked on row " + row + ", col " + col);
				
		// if player clicks a square with no ship, change the color and change square's value
		if (tBoard[row][col] == 0) {
			e.target.style.background = '#ffffff';
			// set this square's value to 3 to indicate that they fired and missed
			tBoard[row][col] = 3;
			
			setTimeout(function() {
				if (window.confirm("Shot missed"))
				{
					turn=turn+1;
					turn = turn%2;
					switchBoard();
				}
			}, 1000);
			
		// if player clicks a square with a ship, change the color and change square's value
		} else if (tBoard[row][col] == "A" || tBoard[row][col] == "B" || tBoard[row][col] == "S" ) {
			e.target.style.background = '#f43d3d';
			// set this square's value to 2 to indicate the ship has been hit
			tBoard[row][col] = 2;
			
			setTimeout(function() {
				if (window.confirm("You got a hit!"))
				{
					turn=turn+1;
					turn = turn%2;
					switchBoard();
				}
			}, 1000);
			
			// increment hitCount each time a ship is hit
			hitCount++;
			if (hitCount == 17) {
				alert("All enemy battleships have been defeated! You win!");
			}
		}	
    }
    e.stopPropagation();
	
}



