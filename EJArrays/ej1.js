//Usar concat en lugar de push para añadir elementos al final de un Array

let arr1 = [1, 2, 3];
let arr2 = [4, 5];

function nonMutatingPush(arr, items){
  //escribir código aquí
    return arr.concat(items);
}


console.log(nonMutatingPush(arr1, arr2));
console.log(arr1);
