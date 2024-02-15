/*
En este ejercicio, vamos a escribir un pequeño módulo para una aplicación de comericio electrónico que nos permita agregar productos a una lista de deseos. 
Tened en cuenta que la aplicación es completamente lado del cliente y no almacena ningún dato, por lo que si actualizas ls página: la lista de deseos se vaciará.

El objetivo es crear un objeto, con la sintasxis de constructor o con la sintaxis de literal de objeto, que represente la lista de deseos, con las siguientes propiedades y méetodos:

Una propiedad items, un array que contendrá los elementos presentes en la lista de deseos.
Una propiedad element, una referencia al elemento HTML asociado a la lista de deseos.
Un método contains, que debe verificar en el array items si hay algún elemento con el data-id especificado. Si es así, debe devolver true, de lo contrario devolverá false.
Un método add, que debe agregar el elemento correspondiente al array items cuando se hace clic en el botón +, y luego llamar al método render. El elemento no se puede agregar dos veces.
Un método remove, que debe eliminar el elemento especificado por data-id del array items. Luego, debe llamar al método render.
Un método render, cuya función es mostrar la lista de elementos en la aplicación. Este método, primeramente llamará al método clear (ya implementado), 
y a continuación, para cada elemento en el array items, generará un nuevo elemento de la lista (con una etiqueta li) y lo añadirá al elemento HTML asociado a la lista de deseos 
(la propiedad element). Cada elemento tendrá asociado un botón - para eliminar el producto de la lista de deseos.

*/

const wishlist = {
    items: [],
    element: document.querySelector('#wishlist'),
    contains(id) {
      return this.items.some((item) => item.id === id);
    },
    add(item) {
      if (!this.contains(item.id)) {
        this.items.push(item);
        this.render();
      }
    },
    remove(id) {
      this.items = this.items.filter((item) => item.id !== id);
      this.render();
    },
    render() {
      this.clear();
      this.items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        const button = document.createElement('button');
        button.textContent = '-';
        button.addEventListener('click', () => {
          this.remove(item.id);
        });
        li.appendChild(button);
        this.element.appendChild(li);
      });
    },
    clear() {
      this.element.querySelectorAll('li').forEach((li) => {
        this.element.removeChild(li);
      });
    }

  };
  
  
  document.querySelectorAll('.add-to-whislist').forEach((e) => {
    e.addEventListener('click', (ev) => {
      const element = ev.target;
      wishlist.add({
        id: element.dataset.id,
        name: element.dataset.name
      });
    })
  });