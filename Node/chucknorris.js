const request = require('request');
let r = request("https://api.chucknorris.io/jokes/random", function(err, response, body){
  if(err !== null) throw err;
  
  const data = JSON.parse(body);
  console.log(data.value);
});

/*
const request = require('request');

const requestPromise = function(url){
   return new Promise(function(resolve, reject) {
        request(url, function(err, response, body) {
          if (err !== null) reject(err);
          else resolve([response, body]);
        });
    });
}

requestPromise("https://api.chucknorris.io/jokes/random")
  .then((args)=> {
    const data = JSON.parse(args[1]);
    console.log(data.value);
  })
  .catch((err)=>{ 
    throw err
  
  });

*/

/*
//async, await,try,catch
const request = require('request');

const requestPromise = function(url){
   return new Promise(function(resolve, reject) {
        request(url, function(err, response, body) {
          if (err !== null) reject(err);
          else resolve([response, body]);
        });
    });
}

async function requestAsync(url) {
  try{
    const result = await requestPromise(url);
    const data = JSON.parse(result[1]);
    console.log(data.value);    
  }catch(err){
    throw err;
  }
}

requestAsync("https://api.chucknorris.io/jokes/random");

*/