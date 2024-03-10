const fs = require("fs");
fs.readFile("file.txt", "utf8", (error, text) => {
  console.log(error);
  if (error) throw error;
  console.log(text);
});