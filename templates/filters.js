const altTexts = require("../static/assets/alttexts.json")
const cfIds = require("../static/data/curseforgeids.json")
const siteUtils = require("../utils/siteutils.js")
const tagUtils = require("../utils/tagutils.js")

var alreadyLoggedNoAlt = {}

// classesOpt - classes to give to the image
var makeImage = (src, classesOpt, idOpt) => {
    var classesArray = classesOpt || []
    var classes = classesArray;
    try{
        classes = classesArray.join(", ");
    } catch {}
    var url = src;
    var alt = "";
    if(src.substring(0, 4) != "http"){
        url = "/assets/" + src;
    }
    if(altTexts[src]){
        alt = altTexts[src];
    } else {
        if(!alreadyLoggedNoAlt.hasOwnProperty(src)){
            console.log(`no alt text for ${src}`)
        }
        alreadyLoggedNoAlt[src] = true;
    }
    var idString = "";
    if(idOpt){
        idString = `id="${idOpt}"`
    }
    return `<img ${idString} class="${classes}" src="${url}" alt="${alt}">`
}

var initFilters = (env) => {
    env.addFilter("mkImg", makeImage);
    env.addFilter("mkHBG", siteUtils.hbgSVG);
    env.addFilter("themedHBG", siteUtils.makeThemedHBG);
    env.addFilter("themedVars", siteUtils.makeThemedVars);
    env.addFilter("mkTag", tagUtils.makeTag);
    env.addFilter("getDesc", siteUtils.getDesc);
    env.addFilter("modrinthShield", (slug) => {
        return `<a class="shield modrinth-shield" target="_blank" href="https://modrinth.com/mod/${slug}"><img alt="Modrinth Downloads For ${slug}" src="https://img.shields.io/modrinth/dt/${slug}?style=for-the-badge&logo=modrinth&logoColor=white&color=%2300af5c"></img></a>`
    })
    env.addFilter("cfShield", (slug) => {
        var id = cfIds[slug] || "error";
        return `<a class="shield cf-shield" target="_blank" href="https://www.curseforge.com/minecraft/mc-mods/${slug}"><img alt="CurseForge Downloads for ${slug}" src="https://img.shields.io/curseforge/dt/${id}?style=for-the-badge&logo=curseforge&logoColor=white&color=%23F16436"></a>`
    })
    env.addFilter("getProjects", tagUtils.getProjects);
}


module.exports = {
    "initFilters": initFilters
}
