const squareElems = document.querySelectorAll("div");
const nextElem = document.querySelector("p");
const olElems = document.querySelector("ol");

let square = new Array(9).fill("");
let stepNum = 0;
const history = [[...square]];


for(let block=0;block<squareElems.length;block++){
  squareElems[block].addEventListener("click",function(){
    if(checkWinner(square)||squareElems[block].textContent) return;

    //<div>.text入力
    square[block]     = stepNum % 2 === 0 ? "o":"x";
    this.textContent  = square[block];

    //<div>削除
    for(let m=stepNum+1;m<history.length;m++){
      olElems.lastElementChild.remove();
    }
    history.length = stepNum+1;
    
    //historyにメモ
    history.push([...square]);

   //nextButton作成
    const crLi = document.createElement("li");
    const crBtn = document.createElement("button");
    crBtn.textContent = `Go to move ${stepNum+1}`;
    crBtn.addEventListener("click",function(){
      const btn = document.querySelectorAll("button");
      let i = 1; 
      while(true){
        if(this === btn[i]) break;
        i++;
      }
      //squareリセット
      square.length = 0;
      square.push(...history[i]) ;
      //現状を表示 
      for(let l=0;l<square.length;l++){
        squareElems[l].textContent = square[l];
      }
      //次の準備
      stepNum = i;
      nextElem.textContent = `nextplayer ${stepNum % 2 === 0 ? "o":"x"}`;
    })
    crLi.append(crBtn);
    olElems.append(crLi);

    //次の準備
    stepNum ++;    
    if(checkWinner(square)){
      nextElem.textContent = `winner ${checkWinner(square)}`
    }
    else{
      nextElem.textContent = `nextplayer ${stepNum % 2 === 0 ? "o":"x"}`
    }

    
  })

}



function checkWinner(array){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]
  for(const line of lines){
    const [a,b,c] = line;
    if(
      array[a] &&
      array[a] === array[b] && 
      array[a] === array[c]
    ){
      return array[a];
    }
  }
  return "";
}
