
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

window.onload = () => {
    setInterval(updateCardOffsets, 20);
}