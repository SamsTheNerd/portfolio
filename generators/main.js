const fs = require('node:fs');
const nunjucks = require("nunjucks")
const projects = require("../data/projects.json")
const tags = require("../data/tags.json")
const njkFilters = require("../templates/filters.js")

// returns HTML string
var generateProjectPage = (projectData) => {
    return nunjucks.render("project_page.njk", {project: projectData});
}

// returns HTML string
var generateTagPage = (tagData) => {
    return nunjucks.render("tag_page.njk", {tag: tagData});
}

var generateAll = () => {
    // delete existing files
    try{
        if(fs.existsSync("./projects")){
            fs.rmSync('./projects', { recursive: true, force: true });
        }
        fs.mkdirSync("./projects");
        if(fs.existsSync("./tags")){
            fs.rmSync('./tags', { recursive: true, force: true });
        }
        fs.mkdirSync("./tags");
    } catch (err) {
        console.error(err);
    }
    var njkenv = nunjucks.configure('templates', { autoescape: false });
    njkFilters.initFilters(njkenv);
    projectKeys = Object.keys(projects);
    for(var p = 0; p < projectKeys.length; p++){
        var project = projects[projectKeys[p]]
        var projectHtml = generateProjectPage(project);
        try{
            fs.writeFileSync(`./projects/${project.id}.html`, projectHtml);
        } catch (err) {
            console.log(err);
        }
    }
    tagKeys = Object.keys(tags);
    for(var t = 0; t < tagKeys.length; t++){
        var tag = tags[tagKeys[t]]
        var tagHtml = generateTagPage(tag);
        try{
            fs.writeFileSync(`./tags/${tag.id}.html`, tagHtml);
        } catch (err) {
            console.log(err);
        }
    }
}

generateAll();