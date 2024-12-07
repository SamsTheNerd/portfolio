
var updateCardOffsets = () => {
    var elems = document.querySelectorAll(".bgsync, .bgsync::before, .bgsync::after");
    for(var i = 0; i < elems.length; i++){
        var elem = elems[i]
        var xOffset = 200 - ((elem.getBoundingClientRect().left + window.scrollX));
        var yOffset = 200 - ((elem.getBoundingClientRect().top + window.scrollY));
        elem.style["background-position-x"] = `${xOffset}px`;
        elem.style.backgroundPositionY = `${yOffset}px`;
        elem.style.setProperty("--bg-x", `${xOffset}px`);
        elem.style.setProperty("--bg-y", `${yOffset}px`);
    }
}

var gallerySelect = (galId, idx) => {
    var imgs = document.getElementById(galId).getElementsByClassName("img-gallery-holder")[0].children;
    var sels = document.getElementById(galId).getElementsByClassName("img-gallery-selectors")[0].children;
    for(var i = 0; i < imgs.length; i++){
        var img = imgs[i];
        var sel = sels[i];
        if(i == idx){
            img.classList.add("gal-sel");
            sel.classList.add("gal-sel");
        } else {
            img.classList.remove("gal-sel");
            sel.classList.remove("gal-sel");
        }
    }
}

window.onload = () => {
    setInterval(updateCardOffsets, 20);
}