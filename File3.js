const http = require('http');

const userData = [
  {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@gmail.com'
  },
  {
    name: 'Janhvi',
    age: 27,
    email: 'janhvi@gmail.com'
  },
  {
    name: 'Rashmi',
    age: 27,
    email: 'rashmi@gmail.com'
  }
];

const server = http.createServer(function (req, resp) {
  resp.setHeader('Content-Type', 'application/json');
  resp.write(JSON.stringify(userData));
  resp.end();
});

server.listen(3005);
