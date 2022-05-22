const fs = require('fs');
const fspromises = require('fs/promises')
const path = require('path');
const {readdir} = require('fs/promises');
const file = path.join(__dirname,'files-copy');
async function removeFolder(file) {
    await fspromises.rmdir(file,{recursive: true}, err => {
         if(err) throw err;
        
      });
 }
async function copyFolder(file) {
    const elements = await readdir(path.join(__dirname), {encoding: 'utf-8', withFileTypes: true});
    let parse = path.parse(file);
    let folderName = parse.name;
    let isCreated = elements.some(item => item.isDirectory() && item.name ==  folderName);
   
    if (isCreated) await removeFolder(file);
        await fspromises.mkdir(file, {recursive: true}, () => {
        console.log('1');
    });
    const enterElems = await readdir(path.join(__dirname,'files'), {encoding: 'utf-8', withFileTypes: true});
    for await (const elem of enterElems) {
        if (elem.isFile() === true) {
    fs.copyFile(path.join(__dirname,`files`,elem.name),path.join(__dirname,'files-copy',elem.name),(err)=>{
        if (err) throw err;
      
      })

    }
}
}

copyFolder(file);