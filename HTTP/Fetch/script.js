/*A continuación un ejemplo de use de la función fetch para enviar peticiones a una API de terceros y recibir respuestas en formato JSON. 
En este caso estamos utilzando el servicio de Google Books para obetener información de todos los volumenes que contienen la cadena de búsqueda "Artificial+Intelligence". 
La url del servicio es https://www.googleapis.com/books/v1/volumes. */

const searchBtnElem = document.querySelector("#searchBtn");

const apiUrl = 'https://www.googleapis.com/books/v1/volumes';
const queryString = '?q=artificial+intelligence';

searchBtnElem.addEventListener("click", function() {

  fetch(apiUrl + queryString, { method: 'GET' })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const bookListElem = document.querySelector("#bookList");
    
    console.log(data);


    while( bookListElem.firstChild ){
      bookListElem.removeChild( bookListElem.firstChild );
    }
    
    data.items.forEach(item => {
      const listElem = document.createElement("li");
      const authors = item.volumeInfo.authors.join(" ");
      listElem.innerHTML = `${item.volumeInfo.title}, ${authors}. ${item.volumeInfo.publisher}. (${item.volumeInfo.publishedDate})`;
      
      bookListElem.appendChild(listElem);
    });
  });
})


