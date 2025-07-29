<articlemeta>
    <name>Drapery</name>
    <keyart>https://github.com/SamsTheNerd/ClothSimMod/blob/main/write-ups/images/bannerthin200.png?raw=true</keyart>
    <description>An unfinished cloth simulation library for Minecraft</description>
    <tags>
        <tag>mc-modding</tag>
        <tag>art</tag>
        <tag>software</tag>
    </tags>
    <priority>2</priority>
</articlemeta>

<center>
{{ "ClothSimMod" | ghShield }}
</center>

[Drapery](https://github.com/SamsTheNerd/ClothSimMod) is a very unfinished cloth simulation library for Minecraft. It was initially made for {{ {code:"CSCI-4530", name:"Advanced Computer Graphics"} | quatalink }}. Currently the simulation is hardcoded for banner rendering but I'd like to extend it to be a proper library.

{{
    [
        {src: "https://github.com/SamsTheNerd/ClothSimMod/blob/main/write-ups/images/bannersflowy.png?raw=true"},
        {src: "https://github.com/SamsTheNerd/ClothSimMod/blob/main/write-ups/images/bannersflowywireframe.png?raw=true"}
    ] | mkGallery
}}

You can find a complete [write-up here](https://github.com/SamsTheNerd/ClothSimMod/blob/main/write-ups/report.pdf). The implementation is based on [Interactive Animation of Structured Deformable Objects](https://www.researchgate.net/publication/221474935_Interactive_Animation_of_Structured_Deformable_Objects).