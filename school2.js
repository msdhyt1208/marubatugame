const squareElems = document.querySelectorAll("div");
const nextElem = document.querySelector("p");
const olElems = document.querySelector("ol");

let square = new Array(9).fill("");
let stepNum = 0;
const history = [[...square]];


for(let i=0;i<squareElems.length;i++){
  squareElems[i].addEventListener("click",function(){
    if(checkWinner(square)||squareElems[i].textContent) return;

    //<div>.text入力
    square[i]         = stepNum % 2 === 0 ? "o":"x";
    this.textContent  = stepNum % 2 === 0 ? "o":"x";

    //<div>削除
    for(let m=stepNum+1;m<history.length;m++){
      olElems.lastElementChild.remove();
    }
    history.length = stepNum+1;
    
    //historyにメモ
    history.push([...square]);

   //nextButton作成
    crLi = document.createElement("li");
    crBtn = document.createElement("button");
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
      for(let i=0;i<square.length;i++){
        squareElems[i].textContent = square[i];
      }
      //次の準備
      stepNum = i;
      nextElem.textContent = `nextplayer ${stepNum % 2 === 0 ? "o":"x"}`;
    })
    crLi.append(crBtn);
    olElems.append(crLi);
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
