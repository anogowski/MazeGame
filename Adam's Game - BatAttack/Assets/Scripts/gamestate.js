var Setup = "Setup";
var Title = "Title";
var Menu = "Menu";
var Play = "Play";
var GameOver = "GameOver";
var Instuctions = "Instructions";
var container;
var levelText;
var scoreText;
var InstructionsText;
var Credits;
var score = 0;
var GameState = Setup;
var speed = 4;
var isWalkRight = true;
var attacking = false;

function SwitchState() {
    switch (GameState) {
    case Setup:
        blockArray[0].addEventListener("click", function (event) {
            TitleEnd();
        });
        blockArray[1].addEventListener("click", function (event) {
            InstructionsStart();
        });
        blockArray[2].addEventListener("click", function (event) {
            MainMenu();
        });
        blockArray[2].visible = false;

        blockArray[2].x = CANVAS_WIDTH - 100;
        blockArray[2].y = 5;

        blockArray[3].addEventListener("click", function (event) {
            if (isMuted) {
                blockArray[3].gotoAndStop(15);
                isMuted = !isMuted;
                bgm.volume = 0.5;
            } else {
                blockArray[3].gotoAndStop(16);
                isMuted = !isMuted;
                bgm.volume = 0;
            }
        });

        instruct = "WASD to move\n\nLeft Arrow or Right Arrow to attack" +
            "\n\nJ Decrease Bat Speed\nH Increase Bat Speed";
        InstructionsText = new createjs.Text(instruct, "20px Arial", "#000");
        InstructionsText.x = 50;
        InstructionsText.y = 150;
        stage.addChild(InstructionsText);
        InstructionsText.visible = false;

        Credits = new createjs.Text("Designer/Developer: Adam Nogowski\n\n" + "Sprites: http://opengameart.org/\n" + "Sound Effects: https://www.freesound.org/\n" + "BGM: http://incompetech.com/", "20px Arial", "#FFF");
        Credits.x = 250;
        Credits.y = CANVAS_HEIGHT - 125;
        stage.addChild(Credits);
        Credits.visible = false;

        container = new createjs.Container();
        levelText = new createjs.Text(1, "15px Arial", "#FFF");
        levelText.x = 100;
        levelText.y = 100;
        levelFrame.x = 0;
        levelFrame.y = 0;
        levelFrame.visible = true;
        container.addChild(levelFrame, levelText);
        container.x = (CANVAS_WIDTH * 0.5) - 100;
        container.y = (CANVAS_HEIGHT * 0.5);
        container.visible = false;
        stage.addChild(container);

        scoreText = new createjs.Text("Score: " + score, "20px Arial", "#F00");
        scoreText.x = (CANVAS_WIDTH * 0.5) - 50;
        scoreText.y = 5;
        scoreText.visible = false;
        stage.addChild(scoreText);
        healthbarSetup();

        bat.visible = true;
        bat.gotoAndPlay("Forward");
        bat.y = 125;
        bat.x = (CANVAS_WIDTH * 0.5) - 75;
        bat.scaleX = 5;
        bat.scaleY = 5;
        stage.addChild(bat);

        GameState = Title;
        break;
    case Title:
        break;

    case Menu:

        break;

    case Play:
        runGameTimer();
        timerText.text = "Time: " + gameTimer;
        scoreText.text = "Score: " + score;
        if (wDown) {
            goblin.y -= speed;
        } else if (sDown) {
            goblin.y += speed;
        }
        if (aDown) {
            goblin.x -= speed;
            if (isWalkRight) {
                goblin.gotoAndPlay("WalkLeft");
                isWalkRight = false;
            }
        } else if (dDown) {
            goblin.x += speed;
            if (!isWalkRight) {
                goblin.gotoAndPlay("WalkRight");
                isWalkRight = true;
            }
        }
        isAttacking();
        moveBats();
        checkVisibleEnemies();
        spawnEnemies();
        bounds();
        testHit();
        if (health <= 0) {
            GameOverStart();
        }
        break;

    case GameOver:

        break;
    }
}

var myTween;

function tweenComplete(tween) {
    if (container.visible) {
        console.log("Tween Complete!");
        timerText.visible = true;
        container.visible = false;
        scoreText.visible = true;
        heathbarContainer.visible = true;
        goblin.visible = true;

        resetGame();
        GameState = Play;
    }
}

function tweenObj() {

    container.visible = true;
    container.y = -200;
    myTween = createjs.Tween.get(container, {
            loop: false
        })
        .wait(500)
        .to({
            x: (CANVAS_WIDTH * 0.5) - 100,
            y: (CANVAS_HEIGHT * 0.5) - 75,
            rotation: 0
        }, 1500, createjs.Ease.bounceOut)
        .wait(2000)
        .to({
            y: 800,
            rotation: 0
        }, 1000, createjs.Ease.backIn)
        .call(tweenComplete);
}


function MainMenu() {
    bat.visible = true;
    hideGameParts();
    titleScreen.visible = true;
    container.visible = false;
    gameoverScreen.visible = false;
    instructionScreen.visible = false;
    blockArray[0].visible = true;
    blockArray[1].visible = true;
    blockArray[2].visible = false;
    heathbarContainer.visible = false;
    InstructionsText.visible = false;
    Credits.visible = false;

    GameState = Title;
}

function TitleEnd() {
    bat.visible = false;
    titleScreen.visible = false;
    instructionScreen.visible = false;
    container.visible = false;
    backgroundScreen.visible = true;
    gameoverScreen.visible = false;
    scoreText.visible = false;
    timerText.visible = false;
    tweenObj();
    blockArray[0].visible = false;
    blockArray[1].visible = false;
    blockArray[2].visible = true;
    heathbarContainer.visible = false;
    InstructionsText.visible = false;
    scoreText.font = "20px Arial";
    scoreText.y = 5;
    Credits.visible = false;

    GameState = Menu;
}

function InstructionsStart() {
    bat.visible = false;
    hideGameParts();
    titleScreen.visible = false;
    instructionScreen.visible = true;
    container.visible = false;
    gameoverScreen.visible = false;
    blockArray[0].visible = true;
    blockArray[1].visible = false;
    blockArray[2].visible = true;
    InstructionsText.visible = true;
    Credits.visible = false;

}

function GameOverStart() {
    hideGameParts();
    titleScreen.visible = false;
    container.visible = false;
    gameoverScreen.visible = true;
    instructionScreen.visible = false;
    scoreText.visible = true;
    blockArray[0].visible = true;
    blockArray[1].visible = true;
    blockArray[2].visible = true;
    scoreText.x = (CANVAS_WIDTH * 0.5) - 50;
    scoreText.y = 150;
    scoreText.font = "30px Arial";
    Credits.visible = true;
    GameState = GameOver;
}


function resetGame() {
    resetHealth();
    score = 0;
    goblin.x = CANVAS_WIDTH * 0.5 - 25;
    goblin.y = 500;
}


function hideGameParts() {
    heathbarContainer.visible = false;
    scoreText.visible = false;
    timerText.visible = false;
    goblin.visible = false;
    backgroundScreen.visible = false;
    resetGameTimer();

    for (i = 0; i < numBats; i++) {
        bats[i].visible = false;
    }
}

function isAttacking() {
    attacking = goblin.currentAnimation == "AttackRight" || goblin.currentAnimation == "AttackLeft";
}