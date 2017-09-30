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
	'SEnd': "",
	'AisSunk':"",
	'BisSunk':"",
	'SisSunk':"",
	'hits': 0
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
	'SEnd': "",
	'AisSunk':"",
	'BisSunk':"",
	'SisSunk':"",
	'hits': 0
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

function clearBoard(){
	tBoard1= [
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
					alert("1Ship locations overlap");
					clearBoard(1);
					validA = false;
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
				validB = true;
				Player1.BStart = foundB[4];
				Player1.BEnd = foundB[6];
				var nOverlap = populateBoard(parseInt(foundB[4].charAt(1))-1, parseInt(foundB[6].charAt(1))-1, startLetter, endLetter, "B", 1);
				if(nOverlap==false){
					alert("2Ship locations overlap");
					clearBoard(1);
					validB = false;
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
				validS = true;
				Player1.SStart = foundS[4];
				Player1.SEnd = foundS[6];
				var nOverlap = populateBoard(parseInt(foundS[4].charAt(1))-1, parseInt(foundS[6].charAt(1))-1, startLetter, endLetter, "S", 1);
				if(nOverlap==false){
					//alert("3Ship locations overlap");
					clearBoard(1);
					validS = false;
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
				validA = true;
				Player2.AStart = foundA[4];
				Player2.AEnd = foundA[6];
				var nOverlap = populateBoard(parseInt(foundA[4].charAt(1))-1, parseInt(foundA[6].charAt(1))-1, startLetter, endLetter, "A", 2);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(2);
					validA = false;
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
					validB = false;
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
				nOverlap = populateBoard(parseInt(foundS[4].charAt(1))-1, parseInt(foundS[6].charAt(1))-1, startLetter, endLetter, "S", 2);
				if(nOverlap==false){
					alert("Ship locations overlap");
					clearBoard(2);
					validS = false;
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
	var board;
	if(tBoard==1){
		board = tBoard1;
	}
	else if(tBoard==2){
		board = tBoard2;
	}
	for(i=colStart; i<=colEnd; i++){
		for(j=rowStart; j<=rowEnd; j++){
			if(board[j][i]==0){
				board[j][i]=ship;
			}
			else{
				return false;
			}
		}
	}
	return true;
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

function initialize(){	

	var t = document.getElementById("tletters").innerHTML="A&emsp;&emsp; B&emsp;&emsp;C&emsp;&emsp;D&emsp;&emsp;E&emsp;&emsp;F&emsp;&emsp;G&emsp;&emsp;H&emsp;&emsp;I&emsp;&emsp;J";
	var b = document.getElementById("bletters").innerHTML="A&emsp;&emsp; B&emsp;&emsp;C&emsp;&emsp;D&emsp;&emsp;E&emsp;&emsp;F&emsp;&emsp;G&emsp;&emsp;H&emsp;&emsp;I&emsp;&emsp;J";
	// Top board
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			var square = document.createElement("div");
			grid1.appendChild(square);

			square.id = 't' + j + i;			
			
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			

			square.style.top = topPosition + 'px';
			square.style.left = leftPosition + 'px';						
		}
	}
	
	//Bottom board
	for (i = 0; i < cols; i++) {
		for (j = 0; j < rows; j++) {
			
			var square = document.createElement("div");
			grid2.appendChild(square);
			square.id = 'b' + j + i;			
			
			var topPosition = j * squareSize;
			var leftPosition = i * squareSize;			
			

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
		var opp = Player2;
	}
	else {
		var tBoard = tBoard1;
		var player = Player2;
		var opp = Player1;
	}
    
	if (e.target !== e.currentTarget) {

		var row = e.target.id.substring(1,2);
		var col = e.target.id.substring(2,3);
		
		if (tBoard[row][col] == 0) {
			e.target.style.background = '#ffffff';
			tBoard[row][col] = 3;
			
			setTimeout(function() {
				if (window.confirm("Shot missed"))
				{
					turn=turn+1;
					turn = turn%2;
					switchBoard();
				}
			}, 1000);
			
		} else if (tBoard[row][col] == "A" || tBoard[row][col] == "B" || tBoard[row][col] == "S" ) {
			if(tBoard[row][col] == "A"){
				opp.Alength=opp.Alength-1;
				opp.hits++;
			}
			else if(tBoard[row][col] == "B"){
				opp.Blength=opp.Blength-1;
				opp.hits++;
			}
			else if(tBoard[row][col] == "S"){
				opp.Slength=opp.Slength-1;
				opp.hits++;
			}
			
			e.target.style.background = '#f43d3d';

			tBoard[row][col] = 2;
			
			setTimeout(function() {
				alert("You got a hit!");
				if(opp.Alength==0 && !opp.AisSunk.equals("t")){
					alert(player.name + " has sunk " + opp.name + "'s aircraft carrier!");
					opp.AisSunk = "t";
				}
				else if(opp.Blength==0 && !opp.BisSunk.equals("t")){
					alert(player.name + " has sunk " + opp.name + "'s battleship!");
					opp.BisSunk = "t";
				}
				else if(opp.Slength==0 && !opp.SisSunk.equals("t")){
					alert(player.name + " has sunk " + opp.name + "'s submarine!");
					opp.SisSunk = "t";
				}
				
				if(opp.Alength==0 && opp.Blength==0 && opp.Slength==0){
					var score = 24-2*(player.hits);
					alert(player.name + " has sunk all of " + opp.name + "'s ships! \nWinning score is " + score);
				}
				
				turn=turn+1;
				turn = turn%2;
				switchBoard();
			}, 1000);
		}	
    }
    e.stopPropagation();
	
}



