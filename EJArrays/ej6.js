// Usar los métodos filter y find para devolver todos los elementos de un Array que no se repiten.

let arr = [3, 1, 3, 2, 5, 4, 4, 4];
let noRepeating = arr.filter(function(item, index, arr){
  return arr.find(function(item2, index2, arr2){
    return item === item2 && index !== index2;
  }) === undefined;
});
        

console.log(noRepeating); //[1, 2, 5]