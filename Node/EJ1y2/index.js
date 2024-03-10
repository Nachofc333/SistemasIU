/*La función se llamará compare_to_ten y, dado un número como argumento, devuelve una promesa que comprueba si el valor del número es menor o mayor que el valor 10. */

const compare_to_ten = (num) => {
  return new Promise((resolve, reject) => {
    if(num > 10){
      resolve(`${num} is greater than 10, success!`);
    } else {
      reject(`${num} is less than 10, error!`);
    }
  });
}


compare_to_ten(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))
  
compare_to_ten(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))