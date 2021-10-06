const { people, age } = require('./people'); // Deconstract import
const om = require('./people'); // Object import

console.log('1 => ');
console.log(people);

console.log('2 => ');
console.log(age);

console.log('3 => ');
console.log(om.people);

console.log('4 => ');
console.log(om.age);

const os = require('os');
console.log(os.platform(), os.homedir());
