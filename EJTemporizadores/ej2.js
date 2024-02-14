let foo = (...args) => args;

console.log(foo(1,2,3));

let newFoo = function(){
  argumentos = Array.from(arguments);
    return argumentos;
}


console.log(newFoo(1,2,3));