const console = document.querySelector("#console");
function Acumulador(valorInicial){
    this.valor = valorInicial;
    this.leer = function(){
        const valor = prompt("¿Cuánto quieres añadir?", 0);
        this.valor += parseInt(valor) || 0;
  }
}
const acc = new Acomulador(parseInt(console.dataset.startingvalue));
const button = document.querySelector("button");
button.addEventListener("click", function(event){
  acc.leer();
  console.innerHTML = acc.valor;
});