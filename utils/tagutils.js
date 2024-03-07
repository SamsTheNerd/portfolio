const siteUtils = require("./siteutils.js")
const tagData = require("../data/tags.json")
const themes = require("../data/themes.json")

const defTagTheme = "blue";

var makeTagHBG = (tag) => {
    var themeId = tag.theme || "blue";
    var theme = themes[themeId];
    return siteUtils.hbgSVG(theme.light, theme.dark, theme.mid);
}

var makeTagVars = (tag) => {
    var themeId = tag.theme || "blue";
    var theme = themes[themeId];
    return `--tag-back: ${theme.light}; --tag-hearts: ${theme.dark}; --tag-mid: ${theme.mid};`;
}

var makeTag = (tagId) => {
    var tag = tagData[tagId];
    return `<a class="tag bgsync hbg-outline" href="/tags/${tag.id}.html" style="--hbg-svg: ${makeTagHBG(tag)}; ${makeTagVars(tag)}">${tag.name}</a>`;
}

module.exports = {
    "makeTag": makeTag
}