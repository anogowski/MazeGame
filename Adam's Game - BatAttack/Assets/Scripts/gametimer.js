var frameCount, gameTimer;

function resetGameTimer() {
    frameCount = 0;
    gameTimer = 0;
}
var timerText = new createjs.Text("Time: " + gameTimer, "12px Arial", "#000000");

function gameTimerSetup() {
    timerText.x = 50;
    timerText.y = 125;
}

function runGameTimer() {
    ++frameCount;
    if (frameCount % (FPS / 10) === 0) {
        gameTimer = frameCount / (FPS);
    }
}
resetGameTimer();
gameTimerSetup();