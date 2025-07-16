const fs = require('node:fs');

fs.cpSync("./static", "./_site", {recursive: true})