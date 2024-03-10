const fs = require('fs');
const request = require('request');

fs.readFile('./query.txt', function(err, data){
  if(err !== null) throw err;

  const queryString = String(data);
  console.log(queryString);
  
  request(`https://api.chucknorris.io/jokes/search?query=${queryString}`, function(err, response, body){
    if(err !== null) throw err;

    const result = JSON.parse(body).result;
    let resultStr = "";
    result.forEach((joke)=> {
      resultStr += joke.value + "\r\n";
    });

    fs.writeFile('./jokes.txt', resultStr, function(err){
      if(err !== null) throw err;

      console.log("Los chistes se han guardado con éxito!");
    });
  });
});

/*
const fs = require('fs');
const request = require('request');

fs.readFile('./query.txt', handleReadFile);

function handleReadFile(err, data){
  if(err !== null) throw err;

  const queryString = String(data);
  console.log(queryString);
  
  request(`https://api.chucknorris.io/jokes/search?query=${queryString}`, handleRequest);
}

function handleRequest(err, response, body){
  if(err !== null) throw err;

  const result = JSON.parse(body).result;
  let resultStr = "";
  result.forEach((joke)=> {
    resultStr += joke.value + "\r\n";
  });

  fs.writeFile('./jokes.txt', resultStr, handleWriteFile);
}

function handleWriteFile(err){
  if(err !== null) throw err;

  console.log("Los chistes se han guardado con éxito!");
}
+*/