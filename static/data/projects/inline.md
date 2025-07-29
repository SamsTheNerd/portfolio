<articlemeta>
    <name>Inline</name>
    <description>A minecraft library for rendering in-line with text.</description>
    <icon>mcmodmisc/inlineicon.png</icon>
    <tags>
        <tag>mc-modding</tag>
        <tag>software</tag>
    </tags>
    <priority>10</priority>
</articlemeta>

<center>
{{ "inline" | modrinthShield }}
{{ "inline" | cfShield }}
{{ "inline" | ghShield }}
</center>

Inline is a Minecraft modding library that adds various rendering hooks, primarily into the game's text rendering.

These hooks are placed so that they work for all in-game text, that includes chat, signs, tooltips, entity names, splash text, item names, and most anywhere else. They're also designed to be as unintrusive as possible for better compatability with other mods.

Inline is now used by a number of mods such as:
- [Hex Casting](https://modrinth.com/mod/hex-casting)
- [Emojiless](https://modrinth.com/mod/emojiless)
- [Potion Icons](https://samsthenerd.com/projects/potionicons)

The mod also adds a number of its own player facing features. Check out the [Modrinth page](https://modrinth.com/mod/inline) for more information on how to use those as well as a [gallery](https://modrinth.com/mod/inline/gallery) of in-game images. 

### How it works

There are two main components: matching and rendering. 

The matching system allows an arbitrary number of matchers to scan in-game text and efficiently attach appropriate
data. For example a matcher could search for all strings of the form `[item:diamond_sword]` and attach rendering data to signal
that a diamond sword should be rendered in place of that text. Most use-cases can use a regular expression based matcher but 
a more general string matching interface is exposed as well. Generally matchers run on the client but there are some exceptions.

The rendering system then looks for data in text as it's being rendered and if it finds any data will defer the rendering of 
that text to the appropriate renderer. This means that data can be attached to text directly by other mods or automatically via
a matcher.

Here's a helpful diagram:
{{ [
    {src: "https://raw.githubusercontent.com/SamsTheNerd/inline/main/assets/flowchart.png"}
    ] 
    | mkGallery }}
