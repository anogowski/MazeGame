var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var FPS = 30;

var canvas, stage, queue;
var scriptSrc = "Assets/Scripts/";
var imgSrc = "Assets/Images/";
var audioSrc = "Assets/Audio/";

function setupCanvas() {
    var canvas = document.getElementById('game');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

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