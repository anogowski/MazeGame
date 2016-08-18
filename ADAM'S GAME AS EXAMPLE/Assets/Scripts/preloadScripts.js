var date = new Date();
var cachedVersion = date.getTime();

scriptManifest = [
    {
        src: "preloadImages.js?a=" + cachedVersion,
        id: "preloadImages"
    },
    {
        src: "preloadAudio.js?a=" + cachedVersion,
        id: "preloadAudio"
    },
    {
        src: "healthbar.js?a=" + cachedVersion,
        id: "healthbar"
    },
    {
        src: "gamestate.js?a=" + cachedVersion,
        id: "gamestate"
    },
    {
        src: "gametimer.js?a=" + cachedVersion,
        id: "gametimer"
    },
    {
        src: "gameloop.js?a=" + cachedVersion,
        id: "gameloop"
    },
    {
        src: "keyboard.js?a=" + cachedVersion,
        id: "keyboard"
    },
    {
        src: "ndgmr.Collision.js?a=" + cachedVersion,
        id: "ndgmr.Collision"
    },
    {
        src: "collision.js?a=" + cachedVersion,
        id: "collision"
    },
    {
        src: "helper.js?a=" + cachedVersion,
        id: "helper"
    }
]


function loadJs() {
    var request = new createjs.LoadQueue(true, scriptSrc);
    request.on("complete", loadJsComplete, this);
    request.loadManifest(scriptManifest);
}

function loadJsComplete(evt) {
    console.log("JS Complete");
}