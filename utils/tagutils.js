const siteUtils = require("./siteutils.js")
const tagData = require("../static/data/tags.json")
const Articles = require('../generators/articles.js')

var makeTag = (tagId) => {
    var tag = tagData[tagId];
    return `<a class="tag bgsync hbg-outline" href="/tags/${tag.id}/" style="--hbg-svg: ${siteUtils.makeThemedHBG(tag.theme)}; ${siteUtils.makeThemedVars(tag.theme)}">${tag.name}</a>`;
}

var getProjects = async (tagId) => {
    var projectData = await Articles.getProjectData();
    return (await Promise.all(Object.values(projectData).map(proj =>{
        if(tagId == "projects" || proj.tags.includes(tagId)){
            return proj;
        }
        return null;
    }))).filter(proj => proj != null);
}

var getBlogPosts = async (tagId) => {
    const blogData = await Articles.getBlogData();
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