var CANVAS_SIZE = 640;
var FPS = 30;

var gameState = 100;

var TITLE = 100;
var INSTRUCTIONS = 200;
var PLAY = 300;
var GAME_OVER = 400;

var canvas, stage, queue;
var scriptSrc = "assets/scripts/";
var imgSrc = "assets/images/";
var audioSrc = "assets/audio/";

var obstacleClearedColor = "#AAE";
var obstacleUnclearedColor = "#A66";
var TOTAL_GAME_TIME_NORMAL = 35;
var TOTAL_GAME_TIME_J = 10000;
var IS_EASYMODE = false;

var sprites;
var gameScore;

 var playerSprite;


var titleContainer = new createjs.Container();
var instructonsContainer = new createjs.Container();
var playContainer = new createjs.Container();
var gameOverContainer = new createjs.Container();


var hasKey = false;
var objectives;
var obstacles;
var walls;

var playTime;
var gameOverTime;

var totalLostTime = 0;





function setupCanvas() {
    var canvas = document.getElementById('game');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    stage = new createjs.Stage(canvas);
    
    stage.addChild(titleContainer);
    stage.addChild(instructonsContainer);
    stage.addChild(playContainer);
    stage.addChild(gameOverContainer);
 
    
    
    stage.enableMouseOver();
    stage.update();

}

var date = new Date();
var cachedVersion = date.getTime();

scriptManifest = [
        {
        src: "init.js?a=" + cachedVersion,
        id: "init"
    },
    
    {
        src: "setup.js?a=" + cachedVersion,
        id: "setup"
    },
//    {
//        src: "preloadAudio.js?a=" + cachedVersion,
//        id: "preloadAudio"
//    },
    {
        src: "gamestate.js?a=" + cachedVersion,
        id: "gamestate"
    },
    {
        src: "gametimer.js?a=" + cachedVersion,
        id: "gametimer"
    }, {
        src: "gameLoopBen.js?a=" + cachedVersion,
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
    }
    
];


function loadJs() {
    var request = new createjs.LoadQueue(true, scriptSrc);
    request.on("complete", loadJsComplete, this);
    request.loadManifest(scriptManifest);
}

function loadJsComplete(evt) {
    console.log("JS Complete");
    loadFiles();
}

function main() { 
    
    setupCanvas();
    loadJs();
      


}

main();