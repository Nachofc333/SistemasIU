Promise.resolve(15)
  .then(val => {
    console.log(val); //15
    return val * 2;
  })
  .then(val => {
    console.log(val); //30
  });