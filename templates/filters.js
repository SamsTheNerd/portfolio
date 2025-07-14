const cfIds = require("../static/data/curseforgeids.json")
const siteUtils = require("../utils/siteutils.js")
const tagUtils = require("../utils/tagutils.js")
const imgUtils = require("../utils/imgutils.js")
const ogs = require('open-graph-scraper-lite');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fetch = require("node-fetch")

var initFilters = (env) => {
    env.addFilter("mkImg", imgUtils.makeImage);
    env.addFilter("mkGallery", imgUtils.makeGallery);
    env.addFilter("youtubeEmbed", videoId => {
        return `<iframe class="youtubeEmbed videoEmbed" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    })
    env.addFilter("mkHBG", siteUtils.hbgSVG);
    env.addFilter("themedHBG", siteUtils.makeThemedHBG);
    env.addFilter("themedVars", siteUtils.makeThemedVars);
    env.addFilter("mkTag", tagUtils.makeTag);
    env.addFilter("getDesc", siteUtils.getDesc);
    env.addFilter("quatalink", (course) => {
        return `<a class="quatalink" target="_blank" href="https://quatalog.com/courses/${course.code}"><img class="quatalink-icon" alt="Quatalog Icon" src="/assets/quatalog/icon.png"></img> ${course.name} (${course.code})</a>`
    })
    env.addFilter("modrinthShield", (slug) => {
        return `<a class="shield modrinth-shield" target="_blank" href="https://modrinth.com/mod/${slug}"><img alt="Modrinth Downloads For ${slug}" src="https://img.shields.io/modrinth/dt/${slug}?style=for-the-badge&logo=modrinth&logoColor=white&color=%2300af5c"></img></a>`
    })
    env.addFilter("ghShield", (slug) => {
        if(slug.split("/").length == 1) slug = `samsthenerd/${slug}`
        return `<a class="shield gh-shield" target="_blank" href="https://github.com/${slug}"><img alt="GitHub Commits For ${slug}" src="https://img.shields.io/github/commit-activity/t/${slug}?style=for-the-badge&logo=github&logoColor=white&color=%23ff507a"></img></a>`
    })
    env.addFilter("cfShield", (slug) => {
        var id = cfIds[slug] || "error";
        return `<a class="shield cf-shield" target="_blank" href="https://www.curseforge.com/minecraft/mc-mods/${slug}"><img alt="CurseForge Downloads for ${slug}" src="https://img.shields.io/curseforge/dt/${id}?style=for-the-badge&logo=curseforge&logoColor=white&color=%23F16436"></a>`
    })
    env.addFilter("getProjects", async (input, callback) => {
        tagUtils.getProjects(input).then(projectData => {
            callback(null, projectData)
        })
    }, true);
    env.addFilter("getBlogPosts", async (input, callback) => {
        tagUtils.getBlogs(input).then(blogData => callback(null, blogData))
    }, true);
    env.addFilter("testAsync", async (input, callback) => {
        var res = await fetch(input);
        var text = await res.text();
        callback(null, text)
    }, true)
    env.addFilter("openGraphTest", async (input, callback) => {
        var res = await fetch(input);
        var text = await res.text();
        var data = await ogs({ html: text})
        const { result } = data;
        if(result.ogImage){
            callback(null, `<img src="${result.ogImage[0].url}">`)
        } else {
            callback(null, input)
        }
    }, true)
    addAsyncFilter(env, "mkOGLink", async (url) => {
        var ogData = await siteUtils.getOpenGraphData(url)
        console.log(ogData);
        return `<div class="ogLink card hbg-blurry" href="${url}"><img src="${ogData.ogImage[0].url}"></div>`
    })
    env.addFilter("addClasses", (html, classes) => {
        var dom = new JSDOM(html)
        var tl = dom.window.document.body.childNodes[0]
        classes.forEach(cls => tl.classList.add(cls))
        return dom.serialize();
    });
}

// async callback takes input and returns promise of string
function addAsyncFilter(env, name, asyncCallback){
    env.addFilter(name, async (input, callback) => {
        var resPromise = asyncCallback(input)
        resPromise.then(res => callback(null, res), err => callback(err, null))
    }, true)
}


module.exports = {
    "initFilters": initFilters
}
