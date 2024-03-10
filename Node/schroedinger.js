const schroedingerCatPromise = new Promise((resolve, reject) => {
    const delay = 1000 * Math.floor(Math.random() * 6);
    setTimeout(() => {
      Math.round(Math.random()) ? resolve("Está vivo") : reject(new Error("Está muerto"));
    }, delay);
  }).then(status => console.log(status))
    .catch(status => console.log(status));