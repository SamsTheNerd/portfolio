<center>
{{ "ducky-periphs" | modrinthShield }}
{{ "ducky-periphs" | cfShield }}
</center>

Ducky Peripherals is a [Minecraft mod](https://en.wikipedia.org/wiki/Minecraft_modding) and an addon for [ComputerCraft](https://modrinth.com/mod/cc-tweaked). It adds a number of peripherals, such as the weather machine, entity detector, and keyboards. Most importantly it adds rubber ducks. It also has [Hex Casting](https://modrinth.com/mod/hex-casting) interop. There is a wiki available [here](https://github.com/SamsTheNerd/ducky-periphs/wiki) documenting the added features.


### Background Info & Lore

For a bit of backstory, ComputerCraft is a rather old mod that adds Lua based computers to the game, as well as turtles that you can program to interact with the world. It also happens to have been my first introduction to programming! 

Around the age of 10 or so, I'd play the mod with my cousin and some friends, we didn't understand much of it but it was fun. I've kept coming back to it over the years though and it holds an incredibly special place in my heart.

Around that same age I was incredibly fascinated with the idea of modding, and I suppose with Minecraft as a whole. I'd spend many of my 4th grade recesses walking the track with my friend chatting about all the mods we could make, if only we knew what this 'eclipse' software was or how to use it. At some point I played around with [MCreator](https://mcreator.net/), but it did not run well on my laptop and I did not end up spending much time with it.

Now, some decade or so later, it was the summer after my freshman year of college and I was back home working during the days and playing modded Minecraft with some friends in the evenings. There was an old ComputerCraft feature where you could send signals through redstone cable bundles (which were added by another mod), and as far as I could tell there wasn't an equivalent for modern versions. 

I realized though that I now knew Java, I knew how to code a bit better, I could probably make a mod? 

That project did not last long (8.5 hours according to my time tracker !). It was a bit much to try to learn everything related to Minecraft's code and ComputerCraft's at once, in particular I got tripped up on how to handle the wire blockstate & model. So I decided to take a step back and try to just make a simple peripheral mod to learn the basics, and so begins Ducky Peripherals.

### What'd I do, What'd I learn

Not only was this my first Minecraft mod, it was also my first non-web project that I was making with any intention of releasing into the world. This meant learning a lot of new stuff, primarily how to use git and github, how to write and publish documentation, and how to keep an organized project.

I also learned a lot about modding, and more generally how to learn and work in an existing codebase like Minecraft's. I started by working with the Fabric loader/api, referencing their wiki quite a bit and poking around the minecraft and computercraft source codes. I struggled the most with getting blocks to appear in game how I wanted them to, and the actual computercraft peripheral part was relatively easy!

The mod of course needed pretty blocks and items, so I got to practice my pixel art a bit as well. The textures I made here were a bit rough, and not my best work these days, but they were a good start.

This was also my first larger java project which meant I got to learn the more intermediate java features such as generics, lambdas/streams, and annotation processors, and get better at general OOP and effectively using/designing classes and interfaces. This was also my first time working with a build tool like gradle, although I would not quite get the hang of it with this project, it was still a nice introduction.