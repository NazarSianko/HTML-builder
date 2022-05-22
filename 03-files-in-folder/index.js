const path = require('path');

const {readdir} = require('fs/promises');




async function func() {
    try {
       
        const elements = await readdir(path.join(__dirname, 'secret-folder'), {encoding: 'utf-8', withFileTypes: true});
      
         for await (const elem of elements) {
             if (elem.isFile() === true) {
                
                const fs = require('fs').promises;
                const way =path.join(__dirname, 'secret-folder',elem.name);
               const stats = await fs.stat(way);
               
                console.log( `${elem.name.split('.')[0]} - ${elem.name.split('.')[1]} - ${stats.size/1000}kb\n`);
                
             }
     
       
       
        }
     }
      catch (err) {
        console.error(err);
    }
}
func();
