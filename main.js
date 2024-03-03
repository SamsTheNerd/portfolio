

var updateCardOffsets = () => {
    var elems = document.querySelectorAll(".bgsync");
    for(var i = 0; i < elems.length; i++){
        var elem = elems[i]
        var xOffset = 200 - ((elem.getBoundingClientRect().left + window.scrollX) % 200);
        var yOffset = 200 - ((elem.getBoundingClientRect().top + window.scrollY) % 200);
        elem.style["background-position-x"] = `${xOffset}px`;
        elem.style.backgroundPositionY = `${yOffset}px`;
        console.log(elem.style["background-position-y"])
    }
}

window.onload = () => {
    setInterval(updateCardOffsets, 20);
}