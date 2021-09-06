const { people, age } = require('./people');

console.log('1 => ');
console.log(people);

console.log('2 => ');
console.log(age);

const os = require('os');

console.log(os.platform(), os.homedir());
