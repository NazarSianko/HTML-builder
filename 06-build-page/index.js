const fs = require('fs');
const fspromises = require('fs/promises')
const path = require('path');
const { readdir } = require('fs/promises');
const file = path.join(__dirname, 'project-dist');
let arr = [];
async function removeFolder(file) {
    await fspromises.rmdir(file, { recursive: true }, err => {
        if (err) throw err;

    });
}
async function createFolder(file) {
    const elements = await readdir(path.join(__dirname), { encoding: 'utf-8', withFileTypes: true });
    let parse = path.parse(file);
    let folderName = parse.name;
    let isCreated = elements.some(item => item.isDirectory() && item.name == folderName);
    //check and create project-dist
    if (isCreated) await removeFolder(file);
    await fspromises.mkdir(file, { recursive: true }, () => {
        console.log('1');
    });
    await fspromises.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, () => {
        console.log('1');
    })
    await fspromises.mkdir(path.join(__dirname, 'project-dist/assets/fonts'), { recursive: true }, () => {
        console.log('1');
    })
    await fspromises.mkdir(path.join(__dirname, 'project-dist/assets/img'), { recursive: true }, () => {
        console.log('1');
    })
    await fspromises.mkdir(path.join(__dirname, 'project-dist/assets/svg'), { recursive: true }, () => {
        console.log('1');
    })


    //copy files
    const fontsElems = await readdir(path.join(__dirname, 'assets/fonts'), { encoding: 'utf-8', withFileTypes: true });

         for await (const elem of fontsElems) {
        if (elem.isFile())
            fs.copyFile(path.join(__dirname, `assets/fonts`, elem.name), path.join(__dirname, 'project-dist/assets/fonts', elem.name), (err) => {
                if (err) throw err;
            })

     const imgElems = await readdir(path.join(__dirname, 'assets/img'), { encoding: 'utf-8', withFileTypes: true });
 
         for await (const elem of imgElems) {
            if (elem.isFile())
                fs.copyFile(path.join(__dirname, `assets/img`, elem.name), path.join(__dirname, 'project-dist/assets/img', elem.name), (err) => {
                    if (err) throw err;
                })
        }
    }
    const svgElems = await readdir(path.join(__dirname, 'assets/svg'), { encoding: 'utf-8', withFileTypes: true });

         for await (const elem of svgElems) {
        if (elem.isFile())
            fs.copyFile(path.join(__dirname, `assets/svg`, elem.name), path.join(__dirname, 'project-dist/assets/svg', elem.name), (err) => {
                if (err) throw err;
            })
    }

    //create style.css
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (file.isFile() && path.extname(file.name) == '.css') {
                fs.readFile(path.join(__dirname, 'styles', file.name), 'utf-8', (err, data) => {
                    if (err) throw err;
                    arr.push(data);
                    let date = arr.join('');
                    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), date, (err) => {
                        if (err) throw err;
                    })
                })
            }
        }


    })
    //work with template.html
    let data = await fspromises.readFile(path.join(__dirname, 'template.html'), 'utf8');
    const components = await readdir(path.join(__dirname, 'components'), { encoding: 'utf-8', withFileTypes: true });

    for (const elem of components) {
        data = data.replace(`{{${elem.name.split('.')[0]}}}`, await fspromises.readFile(path.join(__dirname, `components/${elem.name}`), 'utf8'));
    }
    await fspromises.writeFile(path.join(__dirname, 'project-dist/index.html'), data);

}

createFolder(file);