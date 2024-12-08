const siteUtils = require("./siteutils.js")
const tagData = require("../static/data/tags.json")
const projectsData = require('../static/data/projects.json')
const blogGen = require('../generators/blog.js')

var makeTag = (tagId) => {
    var tag = tagData[tagId];
    return `<a class="tag bgsync hbg-outline" href="/tags/${tag.id}/" style="--hbg-svg: ${siteUtils.makeThemedHBG(tag.theme)}; ${siteUtils.makeThemedVars(tag.theme)}">${tag.name}</a>`;
}

var getProjects = (tagId) => {
    return Object.keys(projectsData).map(key => {
        var proj = projectsData[key];
        if(tagId == "projects" || proj.tags.includes(tagId)){
            return proj;
        }
        return null;
    }).filter(proj => proj != null);
}

var getBlogPosts = (tagId) => {
    const blogData = blogGen.getBlogData();
    var posts = Object.keys(blogData).map(key => {
        var blog = blogData[key];
        if(tagId == "posts" || blog.tags.includes(tagId)){
            return blog;
        }
        return null;
    }).filter(blog => blog != null);
    return posts.sort((a,b) => a.date > b .date)
}

module.exports = {
    "makeTag": makeTag,
    "getProjects": getProjects,
    "getBlogs": getBlogPosts
}