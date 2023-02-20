const square = document.querySelectorAll(".cell");
const nextPlayer = document.querySelector("p");
const ol = document.querySelector("ol");

let record = [];

let bord =[
  0,0,0,
  0,0,0,
  0,0,0
]
let tarn = 1;
let beforeTarn =0;


for(let id=0;id<9;id++){
  square[id].addEventListener("click",function(){

    //先客がいれば入れられば入れない
    if(square[id].textContent !== "") return;
    // 勝利条件に該当すれば終了
    if (game.victory(bord))  return;
    // 前のターンまで戻す
    for(i=tarn;i<=beforeTarn;i++){
      ol.lastChild.remove();
    }
    // 前のターンを登録する
    beforeTarn = tarn;
    // 入力する駒を選択
    square[id].textContent =tarn % 2 ===0 ? "✕" :"〇";
    nextPlayer.textContent = `Next player: ${ tarn % 2 ===0 ? "〇" :"✕" }`; 
    bord[id] = square[id].textContent ;
    // 棋譜を登録
    record[tarn-1] = id;   
    console.log(record);
    // <li><button>Go to move #${tarn}</button></li>を作成
    const crLi = document.createElement('li');
    const crBtn = document.createElement('button');
    crLi.appendChild(crBtn);
    ol.appendChild(crLi);
    crBtn.textContent = `Go to move #${tarn}`;

    // buttonのclassをターンにする
    crBtn.classList.add(tarn);
    // buttonのevent
    crBtn.addEventListener("click",function(){
      for(i=Number(crBtn.className);i<(tarn-1);i++){
        square[Number(record[i])].textContent = "";
        bord[Number(record[i])] = 0;
        record[i] = null; 
      }
      tarn = Number(crBtn.className)+1;
    }) 
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