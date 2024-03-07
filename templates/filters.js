const altTexts = require("../assets/alttexts.json")
const cfIds = require("../data/curseforgeids.json")
const siteUtils = require("../utils/siteutils.js")
const tagUtils = require("../utils/tagutils.js")


// classesOpt - classes to give to the image
// nsDirOpt - how many directories nested we are, defaults to 1 for projects (TODO: change this to 2 if we put each page in its own folder)
var makeImage = (src, classesOpt, nsDirsOpt) => {
    var nsDirs = nsDirsOpt || 1;
    var classesArray = classesOpt || []
    var classes = classesArray;
    try{
        classes = classesArray.join(", ");
    } catch {}
    var url = src;
    var alt = "";
    if(src.substring(0, 4) != "http"){
        var urlStart = "./";
        if(nsDirs > 0){
            urlStart = "../".repeat(nsDirs);
        }
        url = urlStart + "assets/" + src;
    }
    if(altTexts[src]){
        alt = altTexts[src];
    }
    return `<img class="${classes}" src="${url}" alt="${alt}">`
}

var initFilters = (env) => {
    env.addFilter("mkImg", makeImage);
    env.addFilter("mkHBG", siteUtils.hbgSVG);
    env.addFilter("mkTag", tagUtils.makeTag);
    env.addFilter("getDesc", siteUtils.getDesc);
    env.addFilter("modrinthShield", (slug) => {
        return `<a class="shield modrinth-shield" target="_blank" href="https://modrinth.com/mod/${slug}"><img alt="Modrinth Downloads For ${slug}" src="https://img.shields.io/modrinth/dt/${slug}?style=for-the-badge&logo=modrinth&logoColor=white&color=%2300af5c"></img></a>`
    })
    env.addFilter("cfShield", (slug) => {
        var id = cfIds[slug] || "error";
        return `<a class="shield cf-shield" target="_blank" href="https://www.curseforge.com/minecraft/mc-mods/${slug}"><img alt="CurseForge Downloads for ${slug}" src="https://img.shields.io/curseforge/dt/${id}?style=for-the-badge&logo=curseforge&logoColor=white&color=%23F16436"></a>`
    })
}


module.exports = {
    "initFilters": initFilters
}
