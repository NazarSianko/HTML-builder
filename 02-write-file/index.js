const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname,'text.txt'));
writeStream.write('Hello ! \n')
const readStream = fs.createReadStream(path.join(__dirname,'text.txt'),'utf-8');
readStream.on('data', chunk => console.log(chunk));
const rl = readline.createInterface({   
    input: process.stdin,
    output: process.stdout,

   });
rl.on('line', (input) => {
    if (input === 'exit') {
        process.exit();
    }
    writeStream.write(`${input}\n`);
})
process.on('SIGINT',() => {
    process.exit();
});
process.on('exit', () => {
    console.log('Exiting, have a good day!');
})


