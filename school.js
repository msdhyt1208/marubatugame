const square =      document.querySelectorAll(".cell");
const nextPlayer =  document.querySelector("p");
const ol = document.querySelector("#move");
let bord =[
  0,0,0,
  0,0,0,
  0,0,0
]
const records = [[...bord]]; 
let tarn = 1;

function buCrAdd (n){
  return function () {
    for(let i=0;i<records[n].length;i++){
      if(records[n][i]===0) square[i].textContent = "";
      else square[i].textContent = records[n][i];
      bord[i] = records[n][i];
    }
    tarn = n-1;
  }
}


for(let id=0;id<9;id++){
  square[id].addEventListener("click",function(){
    if(square[id].textContent !== "") return;
    if (game.victory(bord))  return;
    square[id].textContent =tarn % 2 ===0 ? "x" :"o";
    bord[id] = square[id].textContent;
    records.push([...bord]);
    if(game.victory(bord)){
      nextPlayer.textContent = `Winnerplayer: ${ tarn % 2 ===0 ? "x" :"o" }`; 
    }
    else{
      nextPlayer.textContent = `Next player: ${ tarn % 2 ===0 ? "o" :"x" }`; 
    }
    

    const Li = document.createElement('li');
    const Button = document.createElement('button');
    Button.addEventListener("click",buCrAdd(tarn));

    Button.textContent = `Go to move #${tarn}`;
    Li.appendChild(Button);
    ol.appendChild(Li);

      tarn++;
    
  });
}

const game = {
  victory :function(bord){
    if(bord[0]===bord[3] && bord[3]===bord[6] && bord[6] !== 0) return true;
    if(bord[1]===bord[4] && bord[4]===bord[7] && bord[7] !== 0) return true;
    if(bord[2]===bord[5] && bord[5]===bord[8] && bord[8] !== 0) return true;
    if(bord[0]===bord[1] && bord[1]===bord[2] && bord[2] !== 0) return true;
    if(bord[3]===bord[4] && bord[4]===bord[5] && bord[5] !== 0) return true;
    if(bord[6]===bord[7] && bord[7]===bord[8] && bord[8] !== 0) return true;
    if(bord[0]===bord[4] && bord[4]===bord[8] && bord[8] !== 0) return true; 
    if(bord[2]===bord[4] && bord[4]===bord[6] && bord[6] !== 0) return true;
    return false;
  }
}