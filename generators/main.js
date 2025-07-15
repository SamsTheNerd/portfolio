const fs = require('node:fs');
const nunjucks = require("nunjucks")
const genutils = require("./utils.js")
const siteutils = require('../utils/siteutils.js');
const Articles = require("./articles.js")
const tags = require("../static/data/tags.json")
const njkFilters = require("../templates/filters.js")


var ctx = {
    "currentDateTime": new Date().toLocaleString('en-US')
}

// returns HTML string
var generateTagPage = (tagData) => {
    console.log(`making tag page: ${tagData.id}`)
    return siteutils.nunjucksRenderAsync("tag_page.njk", {tag: tagData, ctx: ctx});
}

// returns HTML string
var generateMainPage = () => {
    // console.log(`tags: ${Object.keys(tags)}`);
    return siteutils.nunjucksRenderAsync("main_page.njk", {ctx: ctx, tags: Object.keys(tags)});
}

const NOW_DATE_GETTER = /([0-9]*)-([0-9]*-([0-9]*))#(.*)/sm;


// returns HTML string
var generateNowPage = async () => {

    nowContentsAll = await fs.readFileSync(`./static/data/nowpage.md`, {encoding: 'utf-8'});
    nows = nowContentsAll.split("#NOW: ")
    nowsList = [];
    for(var i = 1; i < nows.length; i++){
        nowRes = NOW_DATE_GETTER.exec(nows[i]);
        nowDate = new Date(parseInt(nowRes[1]), parseInt(nowRes[2])-1, parseInt(nowRes[3]))
        nowsList.push({
            date: nowDate.toLocaleString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                }),
            content: await siteutils.formatDesc(nowRes[4])
        });
    }
    return await siteutils.nunjucksRenderAsync("now_page.njk", {ctx: ctx, tags: Object.keys(tags), nowestNow: nowsList.shift(), oldNows:nowsList});
}

async function generateAll() {
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

    await Articles.makeBlog();

    console.log("made blog")

    var mainPromise = generateMainPage().then(mainHtml => genutils.writeFile(`./_site`, `index.html`, mainHtml));
    await mainPromise;

    console.log("made main")

    var nowPromise = generateNowPage().then(nowHtml => genutils.writeFile(`./_site/now`, `index.html`, nowHtml));
    await nowPromise;

    console.log("made now")
    
    // make each project page
    var projectData = await Articles.getProjectData();
    console.log("got projectData")
    await Promise.all(Object.values(projectData).map(async project => {
        var projectHtml = await Articles.generateArticlePage(project);
        genutils.writeFile(`./_site/projects/${project.id}`, `index.html`, projectHtml);
        console.log(`made project page: ${project.id}`)
    }));

    // make full project page
    var fakeAllProj = {
        "id": "projects",
        "name": "Projects",
        "color": "green"
    }
    var fakeAllPosts = {
        "id": "posts",
        "name": "Changelog Posts",
        "color": "green"
    }

    var fakeAllProjHtml = await generateTagPage(fakeAllProj);
    var fakeAllPostsHtml = await generateTagPage(fakeAllPosts);
    genutils.writeFile(`./_site/projects`, `index.html`, fakeAllProjHtml);
    genutils.writeFile(`./_site/changelog`, `index.html`, fakeAllPostsHtml);

    // make tag pages
    tagKeys = Object.keys(tags);
    for(var t = 0; t < tagKeys.length; t++){
        var tag = tags[tagKeys[t]]
        var tagHtml = await generateTagPage(tag);
        genutils.writeFile(`./_site/tags/${tag.id}`, `index.html`, tagHtml);
    }
}

generateAll();