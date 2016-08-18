var Setup = "Setup";
var Title = "Title";
var Menu = "Menu";
var Play = "Play";
var GameOver = "GameOver";
var Instuctions = "Instructions";
var container;
var levelText;
var scoreText;
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

        scoreText = new createjs.Text("Score: " + score, "15px Arial", "#F00");
        scoreText.x = (CANVAS_WIDTH * 0.5) - 50;
        scoreText.y = 5;
        scoreText.visible = false;
        stage.addChild(scoreText);
        healthbarSetup();

        GameState = Title;
        break;
    case Title:
        break;

    case Menu:

        break;

    case Play:
        runGameTimer();
        myText.text = "Time: " + gameTimer;
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
    console.log("Tween Complete!");
    myText.visible = true;
    container.visible = false;
    scoreText.visible = true;
    heathbarContainer.visible = true;
    goblin.visible = true;

    resetGame();
    GameState = Play;
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
    titleScreen.visible = true;
    container.visible = false;
    backgroundScreen.visible = false;
    gameoverScreen.visible = false;
    instructionScreen.visible = false;
    scoreText.visible = false;
    myText.visible = false;
    resetGameTimer()
    blockArray[0].visible = true;
    blockArray[1].visible = true;
    blockArray[2].visible = false;
    heathbarContainer.visible = false;
    goblin.visible = false;

    GameState = Title;
}

function TitleEnd() {
    titleScreen.visible = false;
    instructionScreen.visible = false;
    container.visible = false;
    backgroundScreen.visible = true;
    gameoverScreen.visible = false;
    scoreText.visible = false;
    myText.visible = false;
    tweenObj();
    blockArray[0].visible = false;
    blockArray[1].visible = false;
    blockArray[2].visible = true;
    heathbarContainer.visible = false;
    GameState = Menu;
}

function InstructionsStart() {
    titleScreen.visible = false;
    instructionScreen.visible = true;
    container.visible = false;
    backgroundScreen.visible = true;
    gameoverScreen.visible = false;
    scoreText.visible = false;
    myText.visible = false;
    resetGameTimer();
    blockArray[0].visible = true;
    blockArray[1].visible = false;
    blockArray[2].visible = true;
    heathbarContainer.visible = false;
    goblin.visible = false;
}

function GameOverStart() {
    titleScreen.visible = false;
    container.visible = false;
    backgroundScreen.visible = false;
    gameoverScreen.visible = true;
    instructionScreen.visible = false;
    scoreText.visible = true;
    myText.visible = false;
    resetGameTimer();
    blockArray[0].visible = true;
    blockArray[1].visible = true;
    blockArray[2].visible = true;
    heathbarContainer.visible = false;
    goblin.visible = false;

    for (i = 0; i < numBats; ++i) {
        bats[i].visible = false;
    }

    GameState = GameOver;
}


function resetGame() {
    resetHealth();
    score = 0;
    goblin.x = CANVAS_WIDTH * 0.5 - 25;
    goblin.y = 500;
}

var numVisibleEnemies = 3;
var currentVisibleEnemies = 0;
var enemiesToBeVisible = [];

function checkVisibleEnemies() {
    currentVisibleEnemies = 0;
    for (i = 0; i < numBats; ++i) {
        if (bats[i].visible) {
            ++currentVisibleEnemies;
        }
    }
}

function spawnEnemies() {
    while (currentVisibleEnemies < numVisibleEnemies) {
        temp = getRandomInt(0, numBats - 1);
        if (!(bats[temp].visible)) {

            enemiesToBeVisible.push(temp);
            ++currentVisibleEnemies;
            console.log("currentVisibleEnemies");
        }
    }

    while (enemiesToBeVisible.length > 0) {
        temp = enemiesToBeVisible.pop();
        bats[temp].visible = true;
    }
}