const siteUtils = require("./siteutils.js")
const tagData = require("../static/data/tags.json")
const themes = require("../static/data/themes.json")

const defTagTheme = "blue";

var getTheme = (tag) => {
    if(tag.theme == undefined){
        return themes[defTagTheme];
    }
    if(typeof tag.theme == "number"){
        return {
            "light": `hsl(${tag.theme}, 86%, 64%)`,
            "mid": `hsl(${tag.theme}, 66%, 55%)`,
            "dark": `hsl(${tag.theme}, 60%, 46%)`
        }
    }
    if(typeof tag.theme == "string"){
        return themes[tag.theme];
    }
    return tag.theme;
}

var makeTagHBG = (tag) => {
    var theme = getTheme(tag);
    return siteUtils.hbgSVG(theme.light, theme.dark, theme.mid);
}

var makeTagVars = (tag) => {
    var theme = getTheme(tag);
    return `--tag-back: ${theme.light}; --tag-hearts: ${theme.dark}; --tag-mid: ${theme.mid};`;
}

var makeTag = (tagId) => {
    var tag = tagData[tagId];
    return `<a class="tag bgsync hbg-outline" href="/tags/${tag.id}.html" style="--hbg-svg: ${makeTagHBG(tag)}; ${makeTagVars(tag)}">${tag.name}</a>`;
}

module.exports = {
    "makeTag": makeTag
}