const http = require("http");
const fs = require("fs");

const serveStaticFile = async (file, contentType) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}


const PORT = 3000;
const server = http.createServer(async (request, response) => {
  console.log(request.url);
  if (!request.method === "GET") return;
  try {
    let content;
    let contentType;
    switch (request.url) {
      case "/":
      case "/index.html":
        content = await serveStaticFile("www/index.html");
        contentType = "text/html";
        break;

      case "/script.js":
        content = await serveStaticFile("www/script.js");
        contentType = "text/javascript";
        break;

      case "/style.css":
        content = await serveStaticFile("www/style.css");
        contentType = "text/css";
        break;

    }
    response.writeHead(200, { "Content-Type": contentType });
    response.end(content, "utf-8");

  } catch (error) {
    console.log(error)
    response.writeHead(500, { "Content-Type": "text/html" });
    response.write("Error.");
    response.end();
  }




});
server.listen(PORT);