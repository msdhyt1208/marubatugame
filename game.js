const square = document.querySelectorAll(".cell");
const nextPlayer = document.querySelector("p")
const ol = document.querySelector("#move");  
let bord =[
  0,0,0,
  0,0,0,
  0,0,0
]
let tarn = 1;



for(let id=0;id<9;id++){
  square[id].addEventListener("click",function(){
    if(square[id].textContent !== "") return;
    if (game.victory(bord))  return;
    square[id].textContent =tarn % 2 ===0 ? "x" :"o";
    nextPlayer.textContent = `Next player: ${ tarn % 2 ===0 ? "o" :"x" }`; 
    bord[id] = square[id].textContent 
    li = document.createElement('li');
    li.innerHTML = `<button>Go to move #${tarn}</button>` 
    ol.appendChild(li);

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
  },
  addMove:function(){
    li.innerHTML = "<button>Go to move #1</button>" 
    move.appendChild(li);
  }


  
}











// const hoge = [
//   {
//     name :"増田",
//     age :30
//   },
//   {
//     name :"鈴木",
//     age :25,
//   },
//   {
//     name : "田中",
//     age:40
//   }
// ]
// console.log(hoge[2].name);
