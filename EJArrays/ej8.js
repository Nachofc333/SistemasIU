//Ordenar Array por paridad

var sortArrayByParity = function(arr) {
    // escribir vuestro código aquí
    let even = arr.filter(a => a % 2 === 0);
    return even.concat(arr.filter(a => a % 2 !== 0));
};

const a = [3,1,2,4];
o = sortArrayByParity(a);
console.log(o);
//cualquiera de los siguente [2,4,3,1],[4,2,3,1],[2,4,1,3],[4,2,1,3] es un resultado válido