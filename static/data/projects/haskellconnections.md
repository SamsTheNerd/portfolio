
<articlemeta>
    <name>Haskell Connections</name>
    <description>A command line version of nyt connections written in Haskell</description>
    <icon>https://github.com/SamsTheNerd/HaskellConnections/blob/main/connectionsicon.png?raw=true</icon>
    <banner>https://github.com/SamsTheNerd/HaskellConnections/blob/main/banner.png?raw=true</banner>
    <tags>
        <tag>software</tag>
        <tag>games</tag>
    </tags>
</articlemeta>

<center>
{{ "haskellconnections" | ghShield }}
</center>

Haskell Connections is a command line version of nyt connections. It can play local files or fetch archived games from online. 
You can find the game and installation instructions in [its github repo](https://github.com/SamsTheNerd/HaskellConnections).

{{
    [
        { src: "https://github.com/SamsTheNerd/HaskellConnections/blob/main/startupscreen.png?raw=true", desc: "Startup Screen"},
        { src: "https://github.com/SamsTheNerd/HaskellConnections/blob/main/gameplayimage.png?raw=true", desc: "Gameplay"},
        { src: "https://github.com/SamsTheNerd/HaskellConnections/blob/main/winscreen.png?raw=true", desc: "Win Screen"}
    ] | mkGallery
}}

It was originally written as an assignment for {{ {code:"CSCI-4966", name:"Programming in Haskell"} | quatalink }}. I later refined the UI, added the online game fetching, and set up a [GitHub Actions workflow](https://github.com/SamsTheNerd/HaskellConnections/actions/workflows/buildapp.yml) to compile the app for various systems to make distribution easier. 