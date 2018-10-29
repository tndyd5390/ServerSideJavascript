const http = require('http');

const hostname = "127.0.0.1";
const port = 9999;

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end("hello world");
}).listen(port, hostname, () => {
    console.log(`server runnint at http://${hostname}:${port}`);
})