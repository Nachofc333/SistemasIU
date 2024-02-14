// //Modificar el código a continuación para eliminar el error.

// var calculate = {  
//     array: [1, 2, 3],
//     sum: () => {
//       console.log(this);
//       return this.array.reduce((result, item) => result + item);
//     }
//   };
  
//   console.log(this);
   
//   // "TypeError: Cannot read property 'reduce' of undefined"
//   calculate.sum();  

// // Modify the code to eliminate the error.

var calculate = {
    array: [1, 2, 3],
    sum: function() {
      console.log(this);
      return this.array.reduce((result, item) => result + item);
    }
  };
  
  console.log(this);
   
  // "TypeError: Cannot read property 'reduce' of undefined"
  calculate.sum();