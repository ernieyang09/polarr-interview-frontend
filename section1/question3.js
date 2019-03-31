
function test() {
  console.log("start async test");
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log("async task done");
      resolve();
    }, 500);
  })
}
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      resolve();
    }, ms);
  })
}


(async()=>{
  for (let i = 0; i < 10; i++){
      await test();
      console.log("completed task id " + i);
      await sleep(1000);
  }
})()
