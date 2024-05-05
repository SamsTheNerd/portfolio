const fs = require('node:fs');
const nunjucks = require("nunjucks")
const projects = require("../static/data/projects.json")
const tags = require("../static/data/tags.json")
const njkFilters = require("../templates/filters.js")


var ctx = {
    "currentDateTime": new Date().toLocaleString()
}

// returns HTML string
var generateProjectPage = (projectData) => {
    return nunjucks.render("project_page.njk", {project: projectData, ctx: ctx});
}

// returns HTML string
var generateTagPage = (tagData) => {
    return nunjucks.render("tag_page.njk", {tag: tagData, ctx: ctx});
}

// returns HTML string
var generateMainPage = () => {
    return nunjucks.render("main_page.njk", {ctx: ctx});
}

var generateAll = () => {
    // delete existing files
    try{
        if(fs.existsSync("./_site")){
            fs.rmSync('./_site', { recursive: true, force: true });
        }
        fs.mkdirSync("./_site");
        fs.cpSync("./static", "./_site", {recursive: true})
        fs.mkdirSync("./_site/projects");
        fs.mkdirSync("./_site/tags");
    } catch (err) {
        console.error(err);
    }
    var njkenv = nunjucks.configure('templates', { autoescape: false });
    njkFilters.initFilters(njkenv);

    var mainHtml = generateMainPage();
    try{
        fs.writeFileSync(`./_site/index.html`, mainHtml);
    } catch (err) {
        console.log(err);
    }
    
    projectKeys = Object.keys(projects);
    for(var p = 0; p < projectKeys.length; p++){
        var project = projects[projectKeys[p]]
        var projectHtml = generateProjectPage(project);
        try{
            fs.mkdirSync(`./_site/projects/${project.id}`, { recursive: true});
        } catch (err) {
            console.log(err);
        }
        try{
            fs.writeFileSync(`./_site/projects/${project.id}/index.html`, projectHtml);
        } catch (err) {
            console.log(err);
        }
    }
    tagKeys = Object.keys(tags);
    for(var t = 0; t < tagKeys.length; t++){
        var tag = tags[tagKeys[t]]
        var tagHtml = generateTagPage(tag);
        try{
            fs.mkdirSync(`./_site/tags/${tag.id}`, { recursive: true});
        } catch (err) {
            console.log(err);
        }
        try{
            fs.writeFileSync(`./_site/tags/${tag.id}/index.html`, tagHtml);
        } catch (err) {
            console.log(err);
        }
    }
}

generateAll();