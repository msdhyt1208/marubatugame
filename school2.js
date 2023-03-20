/** divのエレメント要素*/
const squareElems = document.querySelectorAll("div");
/** pのエレメント要素 */
const nextElem = document.querySelector("p");
/** @type {Element} olのエレメント要素 */
const olElems = document.querySelector("ol");

/**  @type {number[]} - bordの中身 */
let square = new Array(9).fill("");
/**  @type {number} - 経過ターン */
let stepNum = 0;
/** @type {number[][]} - 棋譜*/
const record = [[...square]];
for(block in squareElems){
  squareElems[block].addEventListener("click",function(){
    if(checkWinner(square)||this.textContent) return;

    //<div>.text入力
    square[block]     = stepNum % 2 === 0 ? "o":"x";
    this.textContent  = square[block];

    //<div>削除
    for(let m=stepNum+1;m<record.length;m++){
      olElems.lastElementChild.remove();
    }
    record.length = stepNum+1;
    
    //recordにメモ
    record.push([...square]);

   //nextButton作成
    const crLi = document.createElement("li");
    const crBtn = document.createElement("button");
    crBtn.textContent = `Go to move ${stepNum+1}`;
    crBtn.No = stepNum+1;
    crBtn.addEventListener("click",function(){
      const btn = document.querySelectorAll("button");
      let i = 1; 
      while(true){
        if(this === btn[i]) break;
        i++;
      }
      stepNum = this.No;
      //squareリセット
      square.length = 0;
      square.push(...record[stepNum]) ;
      //現状を表示 
      for(let l=0;l<square.length;l++){
        squareElems[l].textContent = square[l];
      }
      //次の準備
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


/**
 * 勝利条件
 * 
 * @param array {number[]} -　ボード内のtext  ( 配列 )
 * @returns {string} 勝利した駒（o or x or ""）  
 * 
*/
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