<articlemeta>
    <name>Portfolio Website</name>
    <description>A statically generated website for showing off my work. (Which you should be on right now!)</description>
    <tags>
        <tag>web</tag>
    </tags>
</articlemeta>

<center>
{{ "portfolio" | ghShield }}
</center>

I go back and forth on how to refer to this website, if it should be my portfolio site or personal site or something else. Regardless, it's the website you're currently reading this on. The initial goal of the website was to simply generate project pages from markdown description files, but along the way a lot more was added, including a blog that I hope to actually write on one of these days!

### The Pipeline

The website is hosted on GitHub pages and regenerated on each commit, primarily using the JavaScript-based templating language [Nunjucks](https://mozilla.github.io/nunjucks/). The commit action triggers a NodeJS script that generates different types of pages: home, articles, and tags.

The home page is the simplest, since it's primarily a static page except for listing tags. 

Article pages are the most interesting. They are generated for each markdown file under the [projects directory](https://github.com/SamsTheNerd/portfolio/tree/main/static/data/projects) or the [articles directory](https://github.com/SamsTheNerd/portfolio/tree/main/static/data/articles) and placed in the corresponding locations on the final site. The markdown files have XML metadata at the top that provide information such as their name, description, icon, banner, author, date of writing, and tags. This information is displayed on the project page and saved for later use as well. 

The rest of the markdown file is then evaluated in a Nunjucks environment to expand any [macros](https://mozilla.github.io/nunjucks/templating.html#filters). Next, it's parsed by [MarkedJS](https://marked.js.org/) with the [Highlight](https://github.com/markedjs/marked-highlight) and [KaTeX](https://github.com/UziTech/marked-katex-extension) extensions, to convert the markdown and katex into HTML and do code highlighting. Finally, it's all combined into one page and saved.

You can see the markdown file used for this project [here](https://github.com/SamsTheNerd/portfolio/blob/main/static/data/projects/portfolio.md)!

The tag pages use the same project/article data to display cards linking to the appropriate pages. The [all projects](https://samsthenerd.com/projects/) and [changelog posts](https://samsthenerd.com/changelog/) pages are special cases of tag pages. 

### Neat Features

While working on this, I would frequently get sucked into implementing new features or stylings rather than actually writing about what I worked on, here are some of my favorites! (Check out the [file used to generate this article](https://github.com/SamsTheNerd/portfolio/blob/main/static/data/projects/portfolio.md) to see how they're used.)

- Heart bullet points!
- Image Galleries:
{{
    [
        {src:"cats/christmaspadme.jpeg", description:"Padme at christmas time"},
        {src:"cats/figyawn.jpeg", description:"Fig yawning"},
        {src:"cats/inthesun.jpeg", description:"Cats in the sun"},
        {src:"cats/ontherug.jpeg", description:"Cats on the rug"},
        {src:"cats/doofusfig.jpeg", description:"Fig sleeping peacefully"},
        {src:"cats/bedpadme.jpeg", description:"Padme chilling on the bed"}
    ] | mkGallery
}}

- Code highlighting (via marked) with [Lovely Night 80s theme](https://github.com/SamsTheNerd/LovelyNightEighties)

```java
@Override
public boolean keyPressed(int keyCode, int scanCode, int modifiers) {
    if(keyCode == GLFW.GLFW_KEY_E){
        this.close();
        return true;
    }
    if(keyCode == GLFW.GLFW_KEY_H){
        hintMode = !hintMode;
        return true;
    }
    return super.keyPressed(keyCode, scanCode, modifiers);
}
```

- GitHub, Modrinth, CurseForge shields macros:
<center>{{ "inline" | ghShield }} {{ "inline" | modrinthShield }} {{ "inline" | cfShield }}</center>

- Quatalog course links {{ {code:"CSCI-4450", name:"Principles Of Program Analysis"} | quatalink }}

### Background syncing & fun borders

One feature I spent a lot of time on early on was a system to have elements sync their background image positions. 
This is used for the colorful nav bar button backgrounds, the tag borders, and the card borders with blurred backgrounds.

The syncing is done with JavaScript on the client, so it's not instant, but it works well enough.

For colorful backgrounds (such as on tags or navbar buttons), an SVG is generated with the requested colors during the site generation and then used as a synced background. The blur effect is done externally by blurring the image used for the background and syncing its position. This lets me put another element under to act as a border with a gradient or other pattern.

{{
    [
        {src:"portfoliopics/homepage.png", description:"Website home page with lots of synced backgrounds"},
        {src:"portfoliopics/cards.png", description:"Cards with transitionable gradient borders"}
    ] | mkGallery
}}