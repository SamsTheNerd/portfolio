const fs = require('node:fs');
const nunjucks = require("nunjucks")
const tags = require("../static/data/tags.json")
const genutils = require("./utils.js");
const siteutils = require('../utils/siteutils.js');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var BLOG_DATA = {}
var PROJECT_DATA = {}

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

var blogPathPrefix = `./static/data/articles`;
var projectsPathPrefix = `./static/data/projects`;

const FN_TO_ID = /\/?(.*)(?:\.md)/;

const META_GETTER = /(<articlemeta>.*<\/articlemeta>)\n(.*)/ms

const DATE_GETTER = /\s*(?<month>\d+)(?:\/(?<day>\d+))(?:\/(?<year>\d+))\s*(?:(?<hour>\d+):(?<minute>\d+)(?<meridiem>am|pm)?)?/

var queryOrElse = (doc, query, def) => {
    var elem = doc.querySelector(query)
    return elem == null ? def : elem.innerHTML;
}

// TODO: rename some of these files to make sense with refactor

var articleFileToData = async (fileContent, id) => {
    var parsedIsh = META_GETTER.exec(fileContent)
    var metaData = parsedIsh[1]
    var articleContent = await siteutils.formatDesc(parsedIsh[2])

    var metaDoc = new JSDOM(metaData).window.document
    
    var title = queryOrElse(metaDoc, "title", undefined);
    var name = queryOrElse(metaDoc, "name", undefined);
    
    var date = undefined;
    var dateStr = queryOrElse(metaDoc, "date", undefined);
    if(dateStr){
        var dateRes = DATE_GETTER.exec(dateStr).groups
        // we're not posting in the 90s and i doubt i'll be posting in 100 years
        var year = Number.parseInt(dateRes.year) % 2000 + 2000;
        var month = Number.parseInt(dateRes.month) - 1;
        var day = Number.parseInt(dateRes.day);
        var hour = Number.parseInt(dateRes.hour)
        var date = new Date(year, month, day);
        if(hour){
            var minute = Number.parseInt(dateRes.minute);
            if(dateRes.meridiem == "pm"){
                hour += 12
            }
            date = new Date(year, month, day, hour, minute);
        }
    }

    var tags = [];
    metaDoc.querySelectorAll("tag").forEach(tag => tags.push(tag.innerHTML));

    var priority = Number.parseFloat(queryOrElse(metaDoc, "priority", "5"))
    var hidden = (queryOrElse(metaDoc, "hidden", undefined) != undefined)

    // TODO: grab rest of metadata

    return {
        "id": id,
        "title": title || name,
        "name": name || title,
        "banner": queryOrElse(metaDoc, "banner", undefined),
        "icon": queryOrElse(metaDoc, "icon", undefined),
        "keyart": queryOrElse(metaDoc, "keyart", undefined),
        "date": date,
        "author": queryOrElse(metaDoc, "author", "sam"),
        "tags": tags,
        "description": queryOrElse(metaDoc, "description", queryOrElse(metaDoc, "summary", undefined)),
        "content": articleContent,
        "priority": priority,
        "hidden": hidden
    }
}

var getArticleData = async (articlePathOpt, pathPrefix, articleData) => {
    var articlePath = articlePathOpt || '';

    if(articlePath == '' && Object.keys(articleData).length > 0){
        return articleData;
    }

    await Promise.all(fs.readdirSync(`${pathPrefix}/${articlePath}`).map(async fileName => {
        var localName = `${articlePath}/${fileName}`;
        var fullName = `${pathPrefix}/${localName}`;
        if(isFile(fullName)){
            var articleID = FN_TO_ID.exec(localName)[1];
            articleData[articleID] = await articleFileToData(fs.readFileSync(fullName, {encoding: 'utf-8'}), articleID);
        } else {
            await getArticleData(localName, pathPrefix, articleData);
        }
    }))

    if(articlePath == ''){
        // console.log(BLOG_DATA)
    }
    return articleData;
}

var getBlogData = async () => {
    var data = await getArticleData("", blogPathPrefix, BLOG_DATA);
    Object.keys(data).forEach(k => data[k].type = "blog");
    return data;
}

var getProjectData = async () => {
    var data = await getArticleData("", projectsPathPrefix, PROJECT_DATA);
    Object.keys(data).forEach(k => data[k].type = "project");
    return data;
}

var makeRSS = (articleCount) => {
    articleCount = articleCount || 100;

    var sortedArticles = Object.keys(BLOG_DATA).sort((a,b) => BLOG_DATA[b].date - BLOG_DATA[a].date)

    var rssItems = ""

    for(var i = 0; i < Math.min(sortedArticles.length, articleCount); i++){
        var article = BLOG_DATA[sortedArticles[i]]
        if(article.hidden) continue;
        rssItems += 
        `\n
        <item>
            <title>${article.title}</title>
            <link>https://samsthenerd.com/articles/${article.id}</link>
            <description>${article.description}</description>
        </item>`
    }

    var rssString = 
    `<rss version="2.0">
        <channel>
            <title>Changelog !</title>
            <link>https://samsthenerd.com/</link>
            <description>
                An informal blog about what I (sam !) am working on. Mostly minecraft modding, some other dev stuff, and maybe some art !
            </description>
            <language>en-us</language>
            <lastBuildDate>${(new Date()).toUTCString()}</lastBuildDate>
            <managingEditor>sam@samsthenerd.com (sam)</managingEditor>
            <webMaster>sam@samsthenerd.com (sam)</webMaster>
            ${rssItems}
        </channel>
    </rss>`
    genutils.writeFile(`./_site/articles`, "changelog_rss.xml", rssString)
}


var ctx = {
    "currentDateTime": new Date().toLocaleString('en-US', { timeZone: 'EST' })
}

var makeBlog = async () => {
    await getBlogData()
    makeRSS(100)
    await Promise.all(Object.values(BLOG_DATA).map(async article => {
        var page = await generateArticlePage(article)
        genutils.writeFile(`./_site/articles/${article.id}`, `index.html`, page)
    }))
}

// returns HTML string
var generateArticlePage = (projectData) => {
    return siteutils.nunjucksRenderAsync("article_page.njk", {project: projectData, ctx: ctx});
}

module.exports = {
    "makeBlog": makeBlog,
    "getBlogData": getBlogData,
    "getProjectData": getProjectData,
    "generateArticlePage": generateArticlePage
}