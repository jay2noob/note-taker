const http = require("http");

const PORT = 3306; 

function handleRequest(request, response) {
    response.end("It works!! Path Hit: " + request.url);
}

const server = http.createServer(handleRequest);

server.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});