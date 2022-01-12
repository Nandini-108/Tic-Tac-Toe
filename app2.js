var resetDiv=document.querySelector('.reset');
var cellDivs=document.querySelectorAll('.cell');
var result=document.querySelector('.result');

var board;
const huPlayer='O';
const aiPlayer='X';
const winCombs=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
startGame();
function startGame(){
    result.innerHTML="";
    board=Array.from(Array(9).keys());
    for (const cellDiv of cellDivs) {
    cellDiv.classList.remove('X');
    cellDiv.classList.remove('O');
    cellDiv.classList.remove('won');
    cellDiv.addEventListener('click',handleCell);
    }
}

function handleCell(e){
    if(e.target.classList.length==1){
    turn(e.target.id,huPlayer);
    if(result.innerHTML===""){
    if(!checkTie()) turn(bestSpot(),aiPlayer);
    }}
}
function turn(squareId,player){
    board[squareId]=player;
    document.getElementById(squareId).classList.add(player);
    let gameWon=checkWin(board,player);
    if(gameWon) gameOver(gameWon);
}
function checkWin(board,player){
    let plays=board.reduce((a,e,i)=>
    (e===player)? a.concat(i):a,[]);
    let gameWon=null;
    for(let [index,win] of winCombs.entries()){
        if(win.every(elem=>plays.indexOf(elem)>-1)){
            gameWon={index:index,player:player};
            break;
        }
    }
    return gameWon;
}
function gameOver(gameWon){
    for(let index of winCombs[gameWon.index]){
        document.getElementById(index).classList.add('won');
    }
    for(const cellDiv of cellDivs){
        cellDiv.removeEventListener('click',handleCell);
    }
    declareWinner(gameWon.player==huPlayer?"You Win!":"You Lose.")
}

function declareWinner(who){
    result.innerHTML=who;
}
function emptySquares(){
    return board.filter(s=>typeof s =='number');
}
function bestSpot(){
    return minimax(board,aiPlayer).index;
}
function checkTie() {
	if (emptySquares().length == 0) {
		for (const cellDiv of cellDivs) {
			cellDiv.removeEventListener('click', handleCell);
		}
		declareWinner("Tie Game!")
		return true;
	}
	return false;
}
function minimax(newBoard,player){
    var availSpots=emptySquares();

    if(checkWin(newBoard,huPlayer)){
        return{score:-10};
    }else if(checkWin(newBoard,aiPlayer)){
        return {score:10};
    }else if(availSpots.length===0){
        return {score:0};
    }
    var moves=[];
    for(var i=0;i<availSpots.length;i++){
        var move={};
        move.index=newBoard[availSpots[i]];
        newBoard[availSpots[i]]=player;

        if (player == aiPlayer) {
			var result = minimax(newBoard, huPlayer);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, aiPlayer);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
    }
    var bestMove;
	if(player === aiPlayer) {
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}

resetDiv.addEventListener('click',startGame);
