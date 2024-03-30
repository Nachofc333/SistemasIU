document.querySelector('button').addEventListener('click', async function(ev){ 
    const response = await fetch("/api/data/get");
    const data = await response.json();
    console.log(data);
  });