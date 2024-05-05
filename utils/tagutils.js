const siteUtils = require("./siteutils.js")
const tagData = require("../static/data/tags.json")
const projectsData = require('../static/data/projects.json')

var makeTag = (tagId) => {
    var tag = tagData[tagId];
    return `<a class="tag bgsync hbg-outline" href="/tags/${tag.id}/" style="--hbg-svg: ${siteUtils.makeThemedHBG(tag.theme)}; ${siteUtils.makeThemedVars(tag.theme)}">${tag.name}</a>`;
}

var getProjects = (tagId) => {
    return Object.keys(projectsData).map(key => {
        var proj = projectsData[key];
        if(tagId == "" || proj.tags.includes(tagId)){
            return proj;
        }
        return null;
    }).filter(proj => proj != null);
}

module.exports = {
    "makeTag": makeTag,
    "getProjects": getProjects
}