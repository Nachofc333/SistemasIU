const http = require('http');
const PORT = 8000;
const server = http.createServer((request, response) => {
  console.log(request.method);
  if(request.method === "GET"){
    response.writeHead(200, {"Content-Type": "text/html"});
    switch(request.url){
      case "/": 
        response.write("Hola, Servidor HTTP!\r\n");
        break;
      case "/path/to/a/resource/": 
        response.write("Estoy accediendo al recurso XXX\r\n");
        break;
      case "/path/to/another/resource/": 
        response.write("Estoy accediendo al recurso YYY\r\n");
        break;
    }
  }else{
     response.writeHead(405, {"Content-Type": "text/html"});
     response.write(`Método ${request.method} no permitido!\r\n`);
  }
 
  
  response.end();
});
server.listen(PORT);