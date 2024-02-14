const arr = ['a', 'b', 'c', 'd'];
arr.push('end');
arr.unshift('start');
console.log(arr);

arr2 = ['a', 'b', 'c', 'd'];
arr2 = ['start', ...arr, 'end'];
console.log(arr);

