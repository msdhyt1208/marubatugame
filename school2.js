const squareElems = document.querySelectorAll("div");
const nextElem = document.querySelector("p");
const olElems = document.querySelector("ol");

const square = new Array(9).fill("");
let stepNum = 0;
const history = [[...square]];


for(let i=0;i<squareElems.length;i++){
  squareElems[i].addEventListener("click",function(){
    if(checkWinner(square)||squareElems[i].textContent) return;
    square[i] = stepNum % 2 === 0 ? "o":"x";
    this.textContent = square[i]
    history.push([...square]);
    if(checkWinner(square)){
      nextElem.textContent = `winner ${checkWinner(square)}`
    }
    else{
      nextElem.textContent = `nextplayer ${stepNum % 2 === 0 ? "x":"o"}`
    }

    
    
    
    
    
    
    
    stepNum ++;
    
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
