const fs = require('fs');

const data = new Uint8Array(Buffer.from('Hola, Mundo!'));
fs.writeFile('file2.txt', data, (error) => {
  if (error) throw error;
  console.log('Archivo guardado con éxito');
});
