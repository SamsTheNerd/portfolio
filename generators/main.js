const fs = require('node:fs');

// returns HTML string
var generateProjectPage = (projectData) => {

}

// returns HTML string
var generateTagPage = (tagData) => {

}

var generateAll = () => {
    
    const content = 'Some content!';
    try {
        fs.rmSync('../projects', content);
        fs.writeFileSync('../projects/test.txt', content);
        // file written successfully
    } catch (err) {
        console.error(err);
    }
}

generateAll();