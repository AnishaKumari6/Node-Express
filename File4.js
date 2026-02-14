const http = require('http');
let users = [
    { id: 1, name: "Rashmi", age: 22 },
    { id: 2, name: "supriya", age: 25 }
];

const server = http.createServer((req, res) => {
    const url = req.url;
    const urlParts = url.split('/');
    const userId = urlParts[2];

    // GET all users
    if (req.url === '/users' && req.method === 'GET') {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(users));
    }

    // GET single user
    else if (req.method === "GET" && userId) {
        const user = users.find(u => u.id == userId);

        if (!user) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ message: "User not found" }));
        }

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(user));
    }
    else if (req.method === "POST" && req.url === "/users") {
        let body = "";

        req.on("data", chunk => body += chunk);

        req.on("end", () => {
            const data = JSON.parse(body);

            const newUser = {
                id: users.length + 1,
                name: data.name,
                age: data.age
            };

            users.push(newUser);
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(newUser));
        });}
    else {
        res.statusCode = 404;
        res.end("Route not found");
    }
});

server.listen(3003, () => {
    console.log('Server is running on 3003');
});