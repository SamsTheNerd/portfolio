<articlemeta>
    <name>Hex Addons</name>
    <description>A web collection of all things hexcasting. Addons, interop, tools, and more!</description>
    <icon>mcmodmisc/hexaddonsicon.png</icon>
    <tags>
        <tag>web</tag>
        <tag>graphic-design</tag>
        <tag>mc-modding</tag>
    </tags>
</articlemeta>

<center>
{{ "hexaddons" | ghShield }}
</center>

Hex Additions is a webpage listing addon mods, resource packs, data packs, and other tools for [Hex Casting](https://modrinth.com/mod/hex-casting). It's available at https://addons.hexxy.media 

Frequently people in the Hex Casting discord server ask about what addons are available. Prior to this website, back when there were maybe 5 or so addons, we had a discord bot that displayed a message listing all of the addons, but it ran out of space, motivating the creation of the website.

The website works by reading a list of addons from [a json file](https://github.com/SamsTheNerd/hexaddons/blob/main/hexaddons.json) and fetching necessary metadata from the Modrinth API (with the option to also manually provide necessary info). This makes adding new addons much easier, since most only require a link or two and maybe an alternate description.

The Modrinth API data enables a number of cool features like: 
- highlighting newly released or updated mods
- sorting by current download count, release date, or last updated
- filtering by version and modloader support
- displaying author info
- having automatically up to date metadata, like icons, descriptions, external links, etc

These features have helped the website grow with the hex community. At the time of writing, the addon page has nearly 60 addons and a couple dozen resource packs, data packs, and tools. Many hex creators help to maintain the page by PRing their own work, but I also do frequent searches to make sure we don't miss anything. 