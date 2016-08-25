function loop() {
    var switchState = false;
    switch (gameState) {
    case 100:
        titleContainer.visible = true;
        gameOverContainer.visible = false;
        playContainer.visible = false;
        instructonsContainer.visible = false;
        break;
    case 200:
        titleContainer.visible = false;
        gameOverContainer.visible = false;
        playContainer.visible = false;
        instructonsContainer.visible = true;
        break;
    case 300:
        titleContainer.visible = false;
        gameOverContainer.visible = false;
        playContainer.visible = true;
        instructonsContainer.visible = false;

        // Check current keyboard input, update stage
        updateTime();

        if (gameTimeLeft <= 0) {
            switchState = true;
            PlayFailSound();
            resetPlay();
        } else if (ObjectivesComplete()) {
            switchState = true;
            PlaySuccessSound();
            resetPlay();
        } else {
            MoveObjects();
            HitTests();
        }
        // Check for bounds issues. If so, reverse move, and set direction change to zero.

        break;
    case 400:
        titleContainer.visible = false;
        gameOverContainer.visible = true;
        playContainer.visible = false;
        instructonsContainer.visible = false;



        break;

    }
    if (switchState) {
        gameState = GAME_OVER;
    }

    stage.update();

}

function MoveObjects() {

    if (wDown || upDown) {
        playerSprite.y -= speed;
        if (WallColliding()) {
            playerSprite.y += speed;
        }
    } else if (sDown || downDown) {

        playerSprite.y += speed;
        if (WallColliding()) {
            playerSprite.y -= speed;
        }

    }

    if (aDown || leftDown) {
        playerSprite.x -= speed;
        if (WallColliding()) {
            playerSprite.x += speed;
        }

    } else if (dDown || rightDown) {
        playerSprite.x += speed;
        if (WallColliding()) {
            playerSprite.x -= speed;
        }
    }

    bounds();




}


function FindTargetDirection(obstacle, xTarget, yTarget) {
    //!! TODO, set the xDirection and yDirection to be towards the target.
    var distanceToTargetX = xTarget - obstacle.x;
    var distanceToTargetY = yTarget - obstacle.y;
    obstacle.SetDirection(Math.round(distanceToTargetX / (FPS * 5) * 100) / 100, Math.round(distanceToTargetY / (FPS * 5) * 100) / 100);

    obstacle.SetTarget(obstacle.x + (obstacle.xDirection * 150), obstacle.y + (obstacle.yDirection * 150));
    obstacle.Draw();

}

var timeContainer
var timeBar;

function timeSetup() {
    timeContainer = new createjs.Container();
    boundry = new createjs.Shape();
    boundry.graphics.beginStroke("#000").drawRect(0, 0, 150, 20);

    timeBar = new createjs.Shape();
    timeBar.graphics.beginFill("#F00").drawRect(0, 0, 150, 20);

    timeContainer.addChild(boundry, timeBar);
    timeContainer.x = 5;
    timeContainer.y = 5;
    playContainer.addChild(timeContainer);
}


var frameCount = 0;
var gameTimeLeft = 5;

function updateTime() {

    frameCount += 1;
    if (frameCount % (FPS / 10) === 0) {
        if (IS_EASYMODE === true) {
            gameTimeLeft = TOTAL_GAME_TIME_J - (frameCount / (FPS)) - totalLostTime + (chestsGotten * 10);
        } else {
            gameTimeLeft = TOTAL_GAME_TIME_NORMAL + (chestsGotten * 10) - (frameCount / (FPS)) - totalLostTime;

        }
        playTime.text = Math.round(gameTimeLeft);

         if(IS_EASYMODE)
         {
             timeBar.scaleX = gameTimeLeft / TOTAL_GAME_TIME_J;
         }
         else
         {
            timeBar.scaleX = gameTimeLeft / TOTAL_GAME_TIME_NORMAL;
         }
        




    }

}

function ObjectivesComplete() {
    var complete = true;

    for (var i = 0; i < objectives.length; ++i) {
        if (!objectives[i].gotten) {
            complete = false;
            i = objectives.length;
        }
    }

    return complete;
}


function TrapUpdates() {
    for (var i = 0; i < obstacles.length; ++i) {

        var obstacle = obstacles[i];

        if ((obstacle.trapType) === (MudTrap)) {

        } else {
            if ((obstacle.currentTime) > 0) {
                obstacle.currentTime -= 1;
            } else {
                obstacle.isOn = !obstacle.isOn;
                if (obstacle.isOn) {
                    obstacle.currentTime = obstacle.timeOn;
                } else {
                    obstacle.currentTime = obstacle.timeOff;
                }
            }
            obstacle.Draw();
        }

    }
}