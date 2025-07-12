const cfIds = require("../static/data/curseforgeids.json")
const siteUtils = require("../utils/siteutils.js")
const tagUtils = require("../utils/tagutils.js")
const imgUtils = require("../utils/imgutils.js")

var initFilters = (env) => {
    env.addFilter("mkImg", imgUtils.makeImage);
    env.addFilter("mkGallery", imgUtils.makeGallery);
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
    env.addFilter("getProjects", tagUtils.getProjects);
    env.addFilter("getBlogPosts", tagUtils.getBlogs);
}


module.exports = {
    "initFilters": initFilters
}
