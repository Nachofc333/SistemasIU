// Crear un objeto literal para el libro
var libro = {
    title: "Homo Deus: A brief history of tomorrow",
    author: "Yuval Noah Harari",
    pages: 496,
    frontpageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Homo_Deus_-_A_Brief_History_of_Tomorrow.jpg"
};

// Crear un nuevo elemento div
var div = document.createElement('div');

// Añadir información del libro al div
div.innerHTML = `
    <h2>${libro.title}</h2>
    <h3>${libro.author}</h3>
    <p>${libro.pages} páginas</p>
    <img src="${libro.frontpageUrl}" alt="${libro.title}">
`;

// Añadir el div a la página web
document.body.appendChild(div);