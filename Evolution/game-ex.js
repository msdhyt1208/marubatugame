const square = document.querySelectorAll(".cell");
const nextPlayer = document.querySelector("p");
const ol = document.querySelector("ol");
const select = document.querySelectorAll("header>button");
const body = document.querySelector("body");


const crHeader = document.createElement("header");
body.appendChild(crHeader);
for(let i= 0;i<2;i++){
  crHbutton = document.createElement("button");
  if(i===0) crHbutton.textContent = "対人間";
  else      crHbutton.textContent = "対ＣＰ";
  crHbutton.addEventListener("click",function(){
    if(i===0) game.pvp=false;
    console.log(`pvp${game.pvp}`);
    this.parentNode.remove();
  })
  crHeader.appendChild(crHbutton);
}

for(let cell=0;cell<9;cell++){
  square[cell].addEventListener("click",function(){
    if(square[cell].textContent !== "") return;
    if (game.victory(game.bord))  return;

    square[cell].textContent = game.tarn % 2 ===0 ?  "✕":"〇";
    nextPlayer.textContent = `Next player: ${ game.tarn % 2 ===0 ? "〇" :"✕" }`; 
    game.bord[cell] = square[cell].textContent ;
    game.record[game.tarn-1] = cell;   
    if(!game.pvp) createRemove();
    game.tarn++;
    console.log(game.bord);
    if (!game.pvp) return;
    if (game.victory(game.bord)) return;
    if(game.tarn>9) return;
    game.pvc();
  });
}

const game = {
  record:[
    "","","",
    "","","",
    "","",""
  ],
  bord:[
    "","","",
    "","","",
    "","",""
  ],
  tarn: 1,
  beforeTarn:0,
  pvp: true,

  victory :function(bord){
    if(bord[0]===bord[3] && bord[3]===bord[6] && bord[6] !== "") return true;
    if(bord[1]===bord[4] && bord[4]===bord[7] && bord[7] !== "") return true;
    if(bord[2]===bord[5] && bord[5]===bord[8] && bord[8] !== "") return true;
    if(bord[0]===bord[1] && bord[1]===bord[2] && bord[2] !== "") return true;
    if(bord[3]===bord[4] && bord[4]===bord[5] && bord[5] !== "") return true;
    if(bord[6]===bord[7] && bord[7]===bord[8] && bord[8] !== "") return true;
    if(bord[0]===bord[4] && bord[4]===bord[8] && bord[8] !== "") return true; 
    if(bord[2]===bord[4] && bord[4]===bord[6] && bord[6] !== "") return true;
    return false;
  },
  pvc:function(){
    cell = game.computer();
    game.bord[cell] = "✕";
    square[cell].textContent = "✕";
    game.record[game.tarn-1] = cell;   
    game.tarn++;
  },
  computer:function(){
    for(let cell=0;cell<game.bord.length;cell++){
      if(game.bord[cell]!=="")  continue;
      game.bord[cell] = "✕";
      if(game.victory(game.bord)) return cell;
      game.bord[cell]="";
    }
    for(let cell=0;cell<game.bord.length;cell++){
      if(game.bord[cell]!=="")  continue;
      game.bord[cell] = "〇";
      if(game.victory(game.bord)){
        return cell;
      } 
      game.bord[cell]="";
    }
    if(game.bord[4] === '')  return 4;

    else {
      for(let cell =0;cell<game.bord.length;cell++){
        if(game.bord[cell] == "") return cell;
      }
      return 0;
    }
  }

}
function createRemove(){
  const crLi = document.createElement('li');
  const crBtn = document.createElement('button');
  for(i=game.tarn;i<=game.beforeTarn;i++){
    ol.lastChild.remove();
  }
  game.beforeTarn = game.tarn;
  crLi.appendChild(crBtn);
  ol.appendChild(crLi);
  ol.insertBefore(crLi,ol.children[1]);
  crBtn.textContent = `Go to move #${game.tarn}`;

  // buttonのclassをターンにする
  crBtn.classList.add(game.tarn);
  // buttonのevent
  crBtn.addEventListener("click",function(){
    for(i=Number(crBtn.className);i<(game.tarn-1);i++){
      square[Number(game.record[i])].textContent = "";
      game.bord[Number(game.record[i])] = "";
      game.record[i] = null; 
    }
    game.tarn = Number(crBtn.className)+1;
  }) 
}
