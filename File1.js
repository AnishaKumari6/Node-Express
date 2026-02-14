// const fs=require('fs')
// fs.rename("text.txt","newText.txt",(err)=>{
//     if(err){console.log("err");}
//     else{
//         console.log("renamed");
//     }
// });
const http = require('http');

const server=http.createServer((req,res)=>{
    res.setHeader("Content-type","text/html");
    res.write("<h1>Hello Anisha Kumari</h1>");
    res.end();
});

server.listen(3000);
