const fs = require('node:fs');
const nunjucks = require("nunjucks")
const tags = require("../static/data/tags.json")
const genutils = require("./utils.js")

var BLOG_DATA = {}

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
};

var articlesPathPrefix = `./static/data/articles`;

const FN_TO_ID = /\/?(.*)(?:\.md)/;

const META_GETTER = /(<articlemeta>.*<\/articlemeta>)\n(.*)/gms
const TITLE_GETTER = /<title>(.*)<\/title>/sgm

const DATE_GETTER = /<date>\s*(?<month>\d+)(?:\/(?<day>\d+))(?:\/(?<year>\d+))\s*(?:(?<hour>\d+):(?<minute>\d+)(?<meridiem>am|pm)?)?<\/date>/

var blogFileToData = (fileContent, id) => {
    var parsedIsh = META_GETTER.exec(fileContent)
    var metaData = parsedIsh[1]
    var articleContent = parsedIsh[2]
    
    var title = TITLE_GETTER.exec(metaData)[1];
    
    var dateRes = DATE_GETTER.exec(metaData).groups;

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

    // TODO: grab rest of metadata


    return {
        "id": id,
        "title": title,
        "date": date,
        "content": articleContent
    }
}

var getBlogData = (articlePathOpt) => {
    var articlePath = articlePathOpt || '';

    fs.readdirSync(`${articlesPathPrefix}/${articlePath}`).forEach(fileName => {
        var localName = `${articlePath}/${fileName}`;
        var fullName = `${articlesPathPrefix}/${localName}`;
        if(isFile(fullName)){
            var articleID = FN_TO_ID.exec(localName)[1];
            BLOG_DATA[articleID] = blogFileToData(fs.readFileSync(fullName, {encoding: 'utf-8'}), articleID)
        } else {
            getBlogData(localName)
        }
    })

    if(articlePath == ''){
        // console.log(BLOG_DATA)
    }
}

var makeRSS = (articleCount) => {
    articleCount = articleCount || 100;

    var sortedArticles = Object.keys(BLOG_DATA).sort((a,b) => BLOG_DATA[b].date - BLOG_DATA[a].date)

    var rssItems = ""

    for(var i = 0; i < Math.min(sortedArticles.length, articleCount); i++){
        var article = BLOG_DATA[sortedArticles[i]]
        rssItems += 
        `\n
        <item>
            <title>${article.title}</title>
            <link>https://portfolio.samsthenerd.com/articles/${article.id}</link>
            <description>Boop !</description>
        </item>`
    }

    var rssString = 
    `<rss version="2.0">
        <channel>
            <title>Changelog !</title>
            <link>https://portfolio.samsthenerd.com/</link>
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

var makeBlog = () => {
    getBlogData()
    makeRSS(100)
    Object.keys(BLOG_DATA).forEach(articleID => {
        var page = nunjucks.render("article_page.njk", {article: BLOG_DATA[articleID]});
        genutils.writeFile(`./_site/articles/${articleID}`, `index.html`, page)
    })
}

module.exports = {
    "makeBlog": makeBlog
}