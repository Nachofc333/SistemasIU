const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'www')));

app.listen(3000, function () {
  console.log('Servidor Express en escucha');
});

app.get("/api/data/get", function(req, res) {
  const arr = [1, 2, 3, 4];
  res.end(JSON.stringify(arr));
});


