<articlemeta>
    <title>Test Article !!</title>
    <description>This is a test blog post.</description>
    <banner>quatalog/banner.png</banner>
    <tags>
        <tag>mc-modding</tag>
    </tags>
    <date>5/6/2024 8:50pm</date>
</articlemeta>

# WOW

## What a fun article this is !

### h3

#### h4

##### h5?

###### h6 ?

- it's got lists and *everything* ain't that **AWESOME**

boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop boop 

{{ 
    [
        {src: "mcmodmisc/inlineicon.png", description:"mrrp!"},
        {src: "https://cdn.modrinth.com/data/l2IpK3Ji/images/86fb2abcc7cfea8f3b0b7a96ef767edc682f2093_350.webp", description:"modrinth!"},
        {src: "https://cdn.modrinth.com/data/l2IpK3Ji/images/86fb2abcc7cfea8f3b0b7a96ef767edc682f2093_350.webp", description:"modrinth!"}
    ] | mkGallery 
}}

mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 mrrp :3 


`code inline`

```js

const marked = new Marked(
    markedHighlight({
      emptyLangClass: 'hljs',
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      }
    })
  );

var blogFileToData = (fileContent, id) => {
    var parsedIsh = META_GETTER.exec(fileContent)
    var metaData = parsedIsh[1]
    var artcileContentMD = nunjucks.renderString(parsedIsh[2])
    var articleContent = marked.parse(artcileContentMD);
    
    var title = TITLE_GETTER.exec(metaData)[1];
    
    var dateRes = DATE_GETTER.exec(metaData).groups;

    // we're not posting in the 90s and i doubt i'll be posting in 100 years
    var year = Number.parseInt(dateRes.year) % 2000 + 2000;
    var month = Number.parseInt(dateRes.month) - 1;
    var day = Number.parseInt(dateRes.day);
    var hour = Number.parseInt(dateRes.hour)
    var date = new Date(year, month, day);
    if(hour){
        var minute = Number.parseInt(dateRes.minute);
        if(dateRes.meridiem == "pm"){
            hour += 12
        }
        date = new Date(year, month, day, hour, minute);
    }

    // TODO: grab rest of metadata


    return {
        "id": id,
        "title": title,
        "date": date,
        "content": articleContent
    }
}
```

```hs
import CoreLang.Runad
import Control.Monad.Trans.Maybe (MaybeT (..), mapMaybeT)
import qualified Data.Bifunctor

type Subst = Map Ident Expr -- subst maps for laziness

fullEval :: Expr -> IO (Either EError Expr)
fullEval exp = fst <$> runRunAd (eval exp) (RunadSTIn empty empty 0)

-- eval lazily ?
eval :: Expr -> Runad Expr
-- eval e1@(EVar id) = subst e1
-- eval e1@(EVar id) = ((\m -> maybe (return e1) eval m) <$> lookupVar id) -- immediately substitute it
eval e1@(EVar id) = do -- immediately substitute it
    me2 <- lookupVar id
    case me2 of
        (Just (EVar id')) | id == id' -> return e1
        (Just e2) -> eval e2
        Nothing -> return e1
    -- if me2 == e1 then return me2 else eval me2
eval e1@(ELit _) = return e1
```


katex time : $\sum_{i=0}^n \frac{k(k-1)}{2}$

katex time display mode: $$\sum_{i=0}^n \frac{k(k-1)}{2}$$


<details>
<summary>boop</summary>

```json
{
    "hexgloop": {
        "name": "Hex Gloop",
        "id": "hexgloop",
        "tags": ["mc-modding", "software"],
        "banner": "hexgloop/titlecard.png",
        "icon": "hexgloop/icon.png",
        "summary": "An addon mod for Hex Casting known for its QoL improvements and new mechanics."
    },
    "inline": {
        "name": "Inline",
        "id": "inline",
        "tags": ["mc-modding", "software"],
        "icon": "mcmodmisc/inlineicon.png",
        "summary": "A minecraft library for rendering in-line with text"
    },
    "ducky-periphs": {
        "name": "Ducky Peripherals",
        "id": "ducky-periphs",
        "tags": ["mc-modding", "software"],
        "icon": "mcmodmisc/duckyperiphsicon.webp",
        "summary": "An addon mod for computercraft adding ducks, keyboards, and hex casting compat"
    },
}
```
</details>