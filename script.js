var origBoard;
const huPlayer = 'X';
const aiPlayer = 'O';
const wincombos = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2]
]
const cells = document.querySelectorAll('.cell');

startGame();

function startGame() {
	document.querySelector(".endGame").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for(var i = 0; i < cells.length; i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) {
	if(typeof origBoard[square.target.id] == 'number'){
		turn(square.target.id, huPlayer);
		if(!checkTie()) turn(bestSpot(), aiPlayer);
	}
}

function turn(squareId, player){
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWon(origBoard, player);
	if(gameWon) gameOver(gameWon);
}

function checkWon(board, player){
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for(let [index, win] of wincombos.entries()){
		if(win.every(elem => plays.indexOf(elem) > -1)){
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon){
	for(let index of wincombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor =
		gameWon.player == huPlayer ? "blue" : "red";
	}

	for(var i = 0; i < cells.length; i++){
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == huPlayer ? "You Win." : "You lose!");
}

function declareWinner(who){
	document.querySelector(".endGame").style.display = "block";
	document.querySelector(".endGame .text").innerText = who;
}

function emptySquare(){
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
	return emptySquare()[0];
}

function checkTie(){
	if(emptySquare().length == 0){
		for(var i = 0; i <cells.length; i++){
			cells[i].style.backgroundColor = 'green';
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;
}