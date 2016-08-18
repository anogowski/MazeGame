var CANVAS_SIZE = 640;
var FPS = 30;

var canvas, stage, queue;
var scriptSrc = "assets/scripts/";
var imgSrc = "assets/images/";
var audioSrc = "assets/audio/";

function setupCanvas() {
    var canvas = document.getElementById('game');
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver();
    stage.update();

}

function main() {
    setupCanvas();
    loadJs();
    stage.update();
}

main();