<articlemeta>
    <name>Pico Wordle</name>
    <description>A pico-8 implementation of wordle</description>
    <keyart>https://github.com/SamsTheNerd/picowordle/blob/main/images/picowordle3ds.png?raw=true</keyart>
    <tags>
        <tag>games</tag>
    </tags>
</articlemeta>

<center>
{{ "picowordle" | ghShield}}
</center>

[picowordle](https://github.com/SamsTheNerd/picowordle/) is an implementation of wordle for the [pico-8](https://www.lexaloffle.com/pico-8.php). This is an older project of mine from around spring/summer-ish 2022.

The goal was for it to run on a 3ds via [fake-08](https://github.com/jtothebell/fake-08) and it does!

The game mostly works, it grabs the word from the old predetermined pre-nyt list and plays it. It doesn't have much of a win/lose screen though. Unfortunately it doesn't fit into the proper pico-8 cartridge limit (since there's a lot of 5 letter words!), so it can't be exported for web or `.p8.png`. 

I started working on ways to compress the words, but never quite finished it. Maybe one day I'll come back to it who knows!

{{
    [
        {src: "https://github.com/SamsTheNerd/picowordle/blob/main/images/picowordle3ds.png?raw=true", description: "picowordle running on my 3ds"},
        {src: "https://github.com/SamsTheNerd/picowordle/blob/main/images/wordsgame.png?raw=true", description: "picowordle running on my laptop"}
    ] | mkGallery
}}