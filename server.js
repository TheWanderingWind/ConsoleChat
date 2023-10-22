const http = require("http");
const fs = require("fs");
const serverID = 0001

const server = http.createServer((req, res) => {
    let data = {};

    req.on("data", (chunk) => {
        data += chunk.toString()
    })

    req.on("end", () => {
        switch (req.url) {
            case '/':
                console.log("Get data: ", data)
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end("Помилка 404. Невідомий адрес посилання.");
        }
    })
})

server.on('connect', () => {
    console.log("Підключений новий користувач.")
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`Привіт, вітаємо вас на нашому сервері (${serverID})!`);
})

server.listen(8080, "localhost", () => {
    console.log("Сервер запущений на порті 8080.")
})
