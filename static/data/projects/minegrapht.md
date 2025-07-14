
<articlemeta>
    <name>Minegrapht</name>
    <description>Relational graphs of Minecraft mods created from scraped data.</description>
    <tags>
        <tag>mc-modding</tag>
        <tag>compsci</tag>
    </tags>
</articlemeta>

<center>
{{ "minegraphtmods" | ghShield }}
</center>

Minegrapht was my final project for {{ {code:"CSCI-4963", name:"Graph Mining"} | quatalink}}. The goal was to scrape Minecraft mod data to be able to create graphs with mods as nodes and edges as some measure of relatedness. 

The bulk of the work of this project was scraping data. I scraped mod metadata, dependencies, and what modpacks they are in from curseforge and activity data (authors and issue/pr comments) from GitHub. I then processed this data into various graphs and used networkx to render them. 

You can find the rendered graphs [here](https://github.com/SamsTheNerd/minegraphtmods/tree/main/demos), though be warned that some of the images are a couple dozen megabytes. For more information, see the [complete project write-up](https://github.com/SamsTheNerd/minegraphtmods/blob/main/paper/paper.pdf) or the shorter video presentation:

{{ "r5T0yxO3ZNQ" | youtubeEmbed }}