var frameCount, gameTimer;

function resetGameTimer() {
    frameCount = 0;
    gameTimer = 0;
}
var myText = new createjs.Text("Time: " + gameTimer, "12px Arial", "#000000");

function gameTimerSetup() {
    myText.x = 50;
    myText.y = 125;
}

function runGameTimer() {
    ++frameCount;
    if (frameCount % (FPS / 10) === 0) {
        gameTimer = frameCount / (FPS);
    }
}
resetGameTimer();
gameTimerSetup();