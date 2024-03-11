const http = require("http");
const fs = require("fs");

const PORT = 3000;
const server = http.createServer((request, response) => {
  fs.readFile("www/index.html", function(error, content) {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Error.");
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content, "utf-8");
    }
  });

});
server.listen(PORT);