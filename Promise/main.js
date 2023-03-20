// /**
//  * 1秒後に色を変える
//  * 
//  * 授業日　　  2023年03月06日
//  * 
//  * 最終更新日  2023年03月06日
//  * 
//  * 備考　　　  Promiseなし
//  * @param color {string} - 色
//  * @param doNext {function} - 次の動作
//  */
// const delayColorChenge =(color,doNext)=>{
//   setTimeout(()=>{
//     document.body.style.backgroundColor = color;
//     doNext && doNext();
//   },1000)
// }
// delayColorChenge("olive",()=>{
//   delayColorChenge("coral",()=>{
//     delayColorChenge("gray",()=>{
//       delayColorChenge("orange");
//     })
//   })
// })

// /**
//  * 1秒後に色を変える
//  * 
//  * 授業日　　  2023年03月06日
//  * 
//  * 最終更新日  2023年03月06日
//  * 
//  * 備考　　　  setTimeoutのコールバック地獄
//  */
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

// /**
//  * URLを入力してサイトに入る
//  * もし4000秒たったらerror
//  * 
//  * 授業日　　  2023年03月13日
//  * 
//  * 最終更新日  2023年03月13日
//  * 
//  * 備考　　　  Promiseの説明
//  * @param url {string} - サイトＵＲＬ
//  * @param success {function} - 成功時の関数
//  * @param failure {function} - Error時の関数
//  */
// function fakeReq(url,success,failure){
//   const delay = Math.floor(Math.random()*4500+500);
//   setTimeout(function(){
//     if(delay>4000){
//       failure("conectionTimeOut");
//     }else{
//       success(`成功　url:${url}`);
//     }
//   },delay);
// }
// fakeReq("google.com/page1",function(msg){
//   console.log("成功1",msg);
//   fakeReq("google.com/page2",function(msg){
//     console.log("成功2",msg);
//     fakeReq("google.com/page3",function(msg){
//       console.log("成功3",msg);
//     },
//     function(error){
//       console.log("エラーが発生しました",error);
//     });
//   },
//   function(error){
//     console.log("エラーが発生しました",error);
//   });
// },function(error){
//   console.log("エラーが発生しました",error);
// })


// /**
//  * URLを入力してサイトに入る
//  * 
//  * もし4000秒たったらerror
//  * 
//  * 授業日　　  2023年03月13日
//  * 
//  * 最終更新日  2023年03月13日
//  * 
//  * 備考　　　  Promiseの説明
//  * @param url {string} - サイトＵＲＬ
//  */
// function fakeReqPromice(url){
//   return new Promise(function(resolve,reject){
//     const delay = Math.floor(Math.random()*4500+500);
//     setTimeout(function(){
//       if(delay>4000){
//         reject("conectionTimeOut");
//       }else{
//         resolve(`成功　url:${url}`);
//       }
//     },delay)
//   });
// }
// fakeReqPromice("page1")
//   .then(function(){
//     console.log("成功1");
//     fakeReqPromice("page2")
//       .then(function(){
//         console.log("成功2");
//         fakeReqPromice("page3")
//           .then(function(){
//             console.log("成功3");
//           })
//           .catch(function(){
//             console.log("失敗")
//           })
//       })
//       .catch(function(){
//         console.log("失敗")
//       })
//   })
//   .catch(function(){
//     console.log("失敗")
//   })

// fakeReqPromice("page1")
//   .then(function(){
//     console.log("1");
//     return fakeReqPromice("page2");
//   })
//   .then(function(){
//     console.log("2");
//     return fakeReqPromice("page3")
//   })
//   .then(function(){
//     console.log("3");
//   })
//   .catch(function(error){
//     console.log("失敗",error);
//   })

// /**
//  * コールバック関数の説明
//  * 
//  * 授業日　　  2023年03月13日
//  * 
//  * 最終更新日  2023年03月13日
//  * 
//  * @param func {function} - コールバック関数
//  */
// function myfuync(func){
//   const num = 10;
//   func(num);
// }
// myfuync(function(n){
//   console.log(n)
// });

/**
 * 1秒後に色を変える
 * 
 * 授業日　　  2023年03月13日
 * 
 * 最終更新日  2023年03月13日
 * 
 * 備考　　　  2023年03月13日の課題
 * @param color {string} - 色
 * @return {Promise} 　関数
 */
function delayColorChengeTask(color){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
    if(!color)  reject();
      document.body.style.backgroundColor = color;
      resolve (color);
    },1000)
  })
}
delayColorChengeTask("olive")
  .then(function(color){
    console.log(color);
    return delayColorChengeTask("coral")
  })
  .then(function(color){
    console.log(color);
    return delayColorChengeTask("gray")
  })
  .then(function(color){
    console.log(color);
    return delayColorChengeTask("orange")
  })
  .then(function(color){
    console.log(color);
    return delayColorChengeTask(); //エラー発生
  })
  .then(function(color){
    console.log(color);
  })
  .catch(function(error){
    console.log("error",error);
  })
  .finally(function(){
    console.log("終了")
  })


let stop = false;
/**
 * 1秒後にランダムに色を変え続ける
 * 
 * 授業日　　  -------------
 * 
 * 最終更新日  2023年03月13日
 * 
 * 備考　　　  課題をループにした(マウスクリックにて動作＆停止)
 * @return {object} Promise
 */
function delayColorChengeAuto(){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      const colorRGB = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
      if(!stop)  reject("stop");
      document.body.style.backgroundColor = colorRGB;
      resolve (colorRGB);
    },1000)
  }).then(function(colorRGB){
      console.log(colorRGB);
      return delayColorChengeAuto();
    })
    .catch((error)=>{
      console.log(error);
    })
}
window.addEventListener("click",()=>{
  stop = stop ? false :true;
  if(!stop) return;
  console.log("start");
  delayColorChengeAuto();
})

/**
 * 本日授業内容
 * 
 * 授業日　　  2023年03月20日
 * 
 * 最終更新日  2023年03月20日
 * 
 * 備考　　　  
 * @return {object} Promise
 */
function myfunction(){

}
