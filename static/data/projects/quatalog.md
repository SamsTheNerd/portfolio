<articlemeta>
    <name>Quatalog</name>
    <description>A more useable archive/catalog of RPI courses.</description>
    <icon>quatalog/icon.png</icon>
    <banner>quatalog/banner.png</banner>
    <tags>
        <tag>web</tag>
        <tag>graphic-design</tag>
    </tags>
</articlemeta>

<center>
{{ "quatalog/quatalog" | ghShield }}
</center>

The Quatalog is a web archive of RPI's catalog data. From the [GitHub readme](https://github.com/quatalog/quatalog):
> The Quatalog aims to make course planning easier by providing accurate prerequiste data and data for when a given course was offered in the past, as well as data for how many students were enrolled in the course, and the professor(s) teaching during a given semester.

The Quataog is available at [quatalog.com](quatalog.com). 

I worked on this project with my friend [Will](https://github.com/powe97), who came up with the idea and manages all the backend data scraping. I primarily worked on the design: creating the logo, wordmark, color palette, and website UI. I also worked on improving the search.

{{
    [
        {src:"quatalog/banner.png", description:"Quatalog Wordmark/Banner"},
        {src:"quatalog/icon.png", description:"Quatalog Icon"},
        {src:"quatalog/acgdemo.png", description:"Course Info for ACG (CSCI-4530)"},
        {src:"quatalog/search.png", description:"Search Page"}
    ] | mkGallery
}}

The signature yellow is taken to match [QuACS](quacs.org), a related tool for RPI course scheduling. The rest of the palette is designed to match. The icon is meant to resemble a 'Q' as well as the course history table on the course info page. 

### Portfolio Integration

My portfolio website (which you are most likely reading this on!) has a handy macro to create links referring to classes, like so: 
{{ {code:"CSCI-4530", name:"Advanced Computer Graphics"} | quatalink }}