const readline = require('readline');
const http = require('http');

/**
 * Зробити +- нормальну консольне управління
 * Зробити так, щоб деякий текст завжди був зверху і замінювався при певних умовах
 * Реалізувати відправку до сервера елементарного рядка
 * Реалізувати отримання від сервера елементарного рядка
 */

let client, rl, serverName;

const options = {
    host: '127.0.0.1',
    port: 8080,
    path: '/length_request',
    timeout: 2000,
};

rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
  

console.log("Початок програми.");
console.log("В майбутньому тут буде стан стандарних посалань до серверів.");
console.log("введіть 'exit' для виходу з програми.");


const maxTemplateLog = 10
const maxFullLog = 200

function writeLog(input, log, logFull, type="new", clearPosition=1) {
    if (log.length >= maxTemplateLog) connectLog.splice(clearPosition, clearPosition);
    if (logFull.length >= maxFullLog) connectLog.splice(0, 0);
    
    if (type == "new") {
        log.push(input);
        logFull.push(input);
    } else if (type == "add") {
        log[log.length-1] += input;
        logFull[logFull.length-1] += input;
    } else if (type == "clear") {
        log = [];
        log.push(input);
        logFull = [];
        logFull.push(input);
    }
}

let connectLogFull = ["== Ви завжди можете ввести 'exit' для виходу з програми. =="];
let connectLog = ["== Ви завжди можете ввести 'exit' для виходу з програми. =="];
function writeConnectLog(input, type="new") {
    writeLog(input, connectLog, connectLogFull, type, 1)
}

let serverLogFull = [];
let serverLog = [];
function writeServerLog(input, type="new") {
    writeLog(input, serverLog, serverLogFull, type, 3)
}

let chatLogFull = [];
let chatLog = {};
function writeChatLog(input, type="new") {
    writeLog(input, chatLog, chatLogFull, type, 0)
}


function consoleConnectToServer() {
    rl.question("Введіть адрессу для під'єднання до сервера: ", (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log("Вихід з рограми.");
            rl.close();
        } else {
            console.clear()
            writeConnectLog(`Спроба підключитись до ${input}, зачекайте...`)
            console.log(connectLog.join('\n'));
            // Спроба підключитись
            if (input.toLowerCase() === "connect") {
                writeConnectLog(" (Підключенно)", 'add')
                console.clear();
                //console.log(`${input.toLowerCase} ?= ${"connect"}`)
                connectedToServer("Test Server");
            } else {
                writeConnectLog(" (Невдачна)", 'add')
                console.clear();
                //console.log(`${input.toLowerCase} ?= ${"connect"}`)
                console.log(connectLog.join('\n'));
                console.log("Перевищен час очікування відповіді сервера");
            }
            consoleConnectToServer();
        }
    });
}
consoleConnectToServer();

function connectedToServer(serverName) {
    writeServerLog(`Ви підкоючені до сервера ${serverName}`, "clear");
    writeServerLog("== Ви можете відключитись від сервера ввівши 'close' ==");
    writeServerLog("В майбутньому тут будуть повідомлення про статус друзів користувача");
    console.log(serverLog.join('\n'))
    consoleCommunServer();
}

function consoleCommunServer() {
    rl.question("сервер <= ", (input) => {        
        if (input.toLowerCase() === 'exit') {
            console.log("Відключаємось від сервера...");
            // відключення від сервера
            writeConnectLog(" (Ви від'єднались)", 'add')
            console.log("Вихід з рограми.");
            console.clear();
            rl.close();
        } else if (input.toLowerCase() === 'close') {
            console.log("Відключаємось від сервера...");
            // відключення від сервера
            writeConnectLog(" (Ви від'єднались)", 'add')
            console.clear();
            console.log(connectLog.join('\n'))
            consoleConnectToServer();
        } else {
            console.clear()
            writeServerLog(`сервер <= ${input}`);
            console.log(serverLog.join('\n'));
            // Відправда повідомлення до сервера
            {
                writeServerLog("\t(Перевищен час очіквання відповіді сервера)", "add");
                console.log("Перевищен час очікування відповіді сервера");
            }
            consoleCommunServer();
        }
    });
}
