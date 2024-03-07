const altTexts = require("../assets/alttexts.json")
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
}


module.exports = {
    "initFilters": initFilters
}
