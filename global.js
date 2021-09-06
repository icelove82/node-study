// Node global object

// console.log(global);

// global.setTimeout(() => {
//   console.log('3s in the timeout');
// }, 3000);

setTimeout(() => {
  console.log('in the timeout');
  clearInterval(clock);
}, 3000);

const clock = setInterval(() => {
  console.log('in the interval');
}, 1000);

console.log(__dirname);
console.log(__filename);
