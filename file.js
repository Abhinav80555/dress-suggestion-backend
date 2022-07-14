const fs= require("fs");
// const quote= "new file"

// fs.writeFile("./awesome.html", quote,(err)=>{
//     console.log("completed");
// })
// let n=process.argv[2];
const quote2="\nLive more,worry less"
// for(var i=1; i<=n; i++){
//  fs.writeFile(`./backup/text-${i}.html`, quote2,(err)=>{
//      console.log("completed");
// })

// }

fs.appendFile("./awesome.html",quote2,(err)=>{
    console.log("completed");});