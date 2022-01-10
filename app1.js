var statusDiv=document.querySelector('.status');
var resetDiv=document.querySelector('.reset');
var cellDivs=document.querySelectorAll('.cell');
var result=document.querySelector('.result');

let gamestart=true;
let xnext=true;

const xSymbol = '✖';
const oSymbol = '○';

function letterToSymbol(letter){
    letter === 'X' ? xSymbol : oSymbol;}

function handleWin(letter){
  gamestart = false;
  console.log(letter);
  if (letter === 'X') {
    statusDiv.innerHTML = "✖ has won!";
    result.innerHTML="Winner is: ✖";
  } else {
    statusDiv.innerHTML = "<span>○ has won!</span>";
    result.innerHTML="Winner is: ○";
  }
  for(const cellDiv of cellDivs){
        cellDiv.removeEventListener('click',handleCell);
    }
};

function checkGameStatus(){
  const one = cellDivs[0].classList[1];
  const two = cellDivs[1].classList[1];
  const three = cellDivs[2].classList[1];
  const four = cellDivs[3].classList[1];
  const five = cellDivs[4].classList[1];
  const six = cellDivs[5].classList[1];
  const seven = cellDivs[6].classList[1];
  const eight = cellDivs[7].classList[1];
  const nine = cellDivs[8].classList[1];

  // check winner
  if (one && one === two && one === three) {
    handleWin(one);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  } else if (four && four === five && four === six) {
    handleWin(four);
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  } else if (seven && seven === eight && seven === nine) {
    handleWin(seven);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (one && one === four && one === seven) {
    handleWin(one);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (two && two === five && two === eight) {
    handleWin(two);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  } else if (three && three === six && three === nine) {
    handleWin(three);
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (one && one === five && one === nine) {
    handleWin(one);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  } else if (three && three === five && three === seven) {
    handleWin(three);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');
  } else if (one && two && three && four && five && five && seven && eight && nine) {
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is tied!';
    result.innerHTML="Tied";
  } else {
    xnext = !xnext;
    if (xnext) {
      statusDiv.innerHTML = `${xSymbol} is playing`;
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is playing</span>`;
    }
  }
};


function handleReset(e){
    xnext = true;
  statusDiv.innerHTML = `${xSymbol} is playing`;
  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove('X');
    cellDiv.classList.remove('O');
    cellDiv.classList.remove('won');
  }
  gamestart = true;
  result.innerHTML="";
}
function handleCell(e){
    var classList=e.target.classList;
    if(classList.length==1){
    if(xnext){
        classList.add('X');
        checkGameStatus();
    }
    else{
        classList.add('O');
        checkGameStatus();
    }
}
}
resetDiv.addEventListener('click', handleReset)

for(var cellDiv of cellDivs){
    cellDiv.addEventListener('click',handleCell)
}