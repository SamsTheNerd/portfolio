<articlemeta>
    <name>Lovely Night 80s</name>
    <icon>https://github.com/SamsTheNerd/LovelyNightEighties/blob/main/macos_terminal_icon.png?raw=true</icon>
    <description>A terminal/IDE theme based on Tomorrow Night Eighties</description>
    <tags>
        <tag>art</tag>
        <tag>software</tag>
    </tags>
    <priority>1</priority>
</articlemeta>

<center>
{{ "LovelyNightEighties" | ghShield}}
</center>

[Lovely Night 80s](https://github.com/SamsTheNerd/LovelyNightEighties/) is a theme based on [Tomorrow Night Eighties](https://github.com/chriskempson/tomorrow-theme), with brighter, more saturated colors, and darker, purple-ier bases. It has extensions for a limited set of IDEs that I use and some that my friend [Nyx](https://github.com/WitherKNyx) put together as well. It also has a matching terminal icon that I use for iterm2.

{{
    [{src: "https://github.com/SamsTheNerd/LovelyNightEighties/raw/main/images/LNE_Color_Codes.png?raw=true", description:"Color codes for the theme"}] | mkGallery
}}

This is the theme used in code blocks on this website! For example: 

```lua
local function highlighter(config)
	return function(group, color)
		color = remove_italics(config, color)
		local style = color.style and 'gui=' .. color.style or 'gui=NONE'
		local fg = color.fg and 'guifg = ' .. color.fg or 'guifg = NONE'
		local bg = color.bg and 'guibg = ' .. color.bg or 'guibg = NONE'
		local sp = color.sp and 'guisp = ' .. color.sp or 'guisp = NONE'
		vim.cmd('highlight ' .. group .. ' ' .. style .. ' ' .. fg .. ' ' .. ' ' .. bg .. ' ' .. sp)
	end
end
```