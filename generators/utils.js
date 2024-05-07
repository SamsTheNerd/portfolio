const fs = require('node:fs');

// path shouldn't include filename
var writeFile = (filepath, filename, content) => {
    try{
        fs.mkdirSync(filepath, { recursive: true});
    } catch (err) {
        console.log(err);
    }
    try{
        fs.writeFileSync(`${filepath}/${filename}`, content);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    "writeFile": writeFile
}