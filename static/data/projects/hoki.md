<articlemeta>
    <name>Hoki</name>
    <description>A small, unfinished, functional language made in Haskell</description>
    <tags>
        <tag>software</tag>
        <tag>compsci</tag>
    </tags>
</articlemeta>

<center>
{{ "hoki-lang" | ghShield }}
</center>

[Hoki](https://github.com/SamsTheNerd/hoki-lang/) was our final project for {{ {code:"CSCI-4966", name:"Programming in Haskell"} | quatalink }}. It was a small language with a lot of ambitions that were not quite met for various reasons. The goal was to have a user facing language with some [syntactical quirks](https://github.com/SamsTheNerd/hoki-lang/blob/main/presentations/project-presentation1.pdf) that would compile down to a lambda calculus based core language for simpler evaluation and type checking. I worked on this with my friends [Nyx](https://github.com/WitherKNyx) and [Nori](https://github.com/fish-in-the-sea).

Hoki is named after the fish and has a general fish theming to it.

### Core Language

My role was writing the core language, which was lambda calculus extended with literals, type/data constructors, pattern matching cases, and letrec polymorphism. It uses simple substitution based lazy evaluation and has a type system based on [Practical type inference for arbitrary-rank types](https://www.cambridge.org/core/journals/journal-of-functional-programming/article/practical-type-inference-for-arbitraryrank-types/5339FB9DAB968768874D4C20FA6F8CB6), although it doesn't actually support arbitrary rank types, I just liked the bidirectional approach presented.

The core language has a simple parser and repl that I made for testing. The parser isn't very good, but it gets the job done. It also compiles to Haskell because I thought that'd be funny and it wasn't particularly difficult to do. Some of the execution semantics are a bit different between the two, so it's not a perfect translation.

### Reflecting on the rest of the language

The rest of the language is a bit messy and in various stages of completeness. The project was quite ambitious for the amount of time we had and we failed to finalize a cohesive vision for Hoki at the start. This created significant implementation difficulties later on, especially with integrating the frontend language with the core language. 

In hindsight, while splitting up the work into frontend/core/translation was mostly effective for letting us work asynchronously, it also exasperated communication issues. Giving higher priority to defining workable boundaries between each role at the start would have likely saved us a good bit of headache.