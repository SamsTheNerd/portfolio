const fs = require('node:fs');
const nunjucks = require("nunjucks")
const genutils = require("./utils.js")
const Blog = require("./blog.js")
const projects = require("../static/data/projects.json")
const tags = require("../static/data/tags.json")
const njkFilters = require("../templates/filters.js")


var ctx = {
    "currentDateTime": new Date().toLocaleString('en-US')
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
    // console.log(`tags: ${Object.keys(tags)}`);
    return nunjucks.render("main_page.njk", {ctx: ctx, tags: Object.keys(tags)});
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

    Blog.makeBlog();

    var mainHtml = generateMainPage();
    genutils.writeFile(`./_site`, `index.html`, mainHtml);
    
    // make each project page
    projectKeys = Object.keys(projects);
    for(var p = 0; p < projectKeys.length; p++){
        var project = projects[projectKeys[p]]
        var projectHtml = generateProjectPage(project);
        genutils.writeFile(`./_site/projects/${project.id}`, `index.html`, projectHtml);
    }
    // make full project page
    var fakeAllTag = {
        "id": "",
        "name": "Projects",
        "color": "green"
    }
    var fakeAllTagHtml = generateTagPage(fakeAllTag);
    genutils.writeFile(`./_site/projects`, `index.html`, fakeAllTagHtml);

    // make tag pages
    tagKeys = Object.keys(tags);
    for(var t = 0; t < tagKeys.length; t++){
        var tag = tags[tagKeys[t]]
        var tagHtml = generateTagPage(tag);
        genutils.writeFile(`./_site/tags/${tag.id}`, `index.html`, tagHtml);
    }
}

generateAll();