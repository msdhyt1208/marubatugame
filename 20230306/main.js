// setTimeout(() => {
//   document.body.style.backgroundColor = "olive";
//   setTimeout(() => {
//     document.body.style.backgroundColor = "coral";
//     setTimeout(() => {
//       document.body.style.backgroundColor = "gray";
//       setTimeout(() => {
//         document.body.style.backgroundColor = "orange";
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

const delayColorChenge =(color,doNext)=>{
  setTimeout(()=>{
    document.body.style.backgroundColor = color;
    doNext && doNext();
  },1000)
}
delayColorChenge("olive",()=>{
  delayColorChenge("coral",()=>{
    delayColorChenge("gray",()=>{
      delayColorChenge("orange");
    })
  })
})