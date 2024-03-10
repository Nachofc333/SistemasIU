
/*La primera función, make_all_caps, tomará una Array de palabras y las pondrá en mayúsculas.
 La segunda función, sortWords, ordenará las palabras en orden lexicográfico. Si el Array contiene algo más que cadenas, se debería lanzar un error. */

const good_array = ['cucumber', 'tomatos', 'avocado']
const bad_array = ['cucumber', 44, true]

const make_all_caps = (array) => {
  return new Promise((resolve, reject) => {
    if(array.every((word) => typeof word === 'string')){
      resolve(array.map((word) => word.toUpperCase()));
    } else {
      reject('Error: Not all items in the array are strings!');
    }
  });
}
  
const sort_words = (array) => {
  return new Promise((resolve, reject) => {
    if(array.every((word) => typeof word === 'string')){
      resolve(array.sort());
    } else {
      reject('Error: Not all items in the array are strings!');
    }
  });
}

make_all_caps(good_array)
  .then(sort_words)
  .then((result) => console.log(result))
  .catch(error => console.log(error))
  
make_all_caps(bad_array)
  .then(sort_words)
  .then((result) => console.log(result))
  .catch(error => console.log(error))
  