const fs = require('node:fs');
const nunjucks = require("nunjucks")
const projects = require("../data/projects.json")

// returns HTML string
var generateProjectPage = (projectData) => {
    return nunjucks.render("project_page.njk", {project: projectData});
}

// returns HTML string
var generateTagPage = (tagData) => {

}

var generateAll = () => {
    // delete existing files
    try{
        if(fs.existsSync("./projects")){
            fs.rmSync('./projects', { recursive: true, force: true });
        }
        fs.mkdirSync("./projects");
    } catch (err) {
        console.error(err);
    }
    nunjucks.configure('templates', { autoescape: true });
    for(var i = 0; i < projects.length; i++){
        var projectHtml = generateProjectPage(projects[i]);
        try{
            fs.writeFileSync(`./projects/${projects[i].id}.html`, projectHtml);
        } catch (err) {
            console.log(err);
        }
    }
}

generateAll();