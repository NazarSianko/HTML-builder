const fs = require('fs');
const path = require('path');
let arr = [];

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err,files) => {
    if (err) throw err;
    for (const file of files) {
        if (file.isFile() && path.extname(file.name) == '.css') {
            fs.readFile(path.join(__dirname,'styles',file.name),'utf-8',(err,data) => {
                if (err) throw err;
                arr.push(data);
               
                let date = arr.join('');
                fs.writeFile(path.join(__dirname,'project-dist','bundle.css'),date, (err)=> {
                    if (err) throw err;
                })
            })
        }
    }
    
 
})
