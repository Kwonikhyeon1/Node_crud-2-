let testFolder = '../data';
let fs = require('fs');

fs.readdir(testFolder, function(error, filelist) {

    console.log('filelist ---> ', filelist);

    fs.readFile(`../data/${filelist[0]}`, 'utf8', function(error, data) {
        console.log('data --->', data);



    });

});