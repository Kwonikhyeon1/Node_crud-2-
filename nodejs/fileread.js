let fs = require('fs');

/*
console.log('11111');
fs.readFile('./sample.txt', 'utf8', function(err, data) {

    console.log('data: ', data);

});
console.log('22222');
*/

console.log('11111');
let data = fs.readFileSync('./sample.txt', 'utf8');
console.log(data);

console.log('22222');