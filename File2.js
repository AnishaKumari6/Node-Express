const http = require('http');
const name="Anisha Kumari"
const server=http.createServer((req,res)=>{
    res.setHeader("Content-Type", "text/html")
    res.write(`<html>
        <head>
        <title>My Page</title>
        <body>
        <h1>Hey!!! I am `+name+` </h1>
          <p> My course is Btech CSE </p>
          <p> My skills are HTML, CSS, Javascript, React and Node </p>
          <p> Time : `+new Date+`
        </body></html>`)
         res.end(); 
})
server.listen(3003);