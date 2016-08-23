var queue;
var buttons, bat, goblin;
var blockArray = [];
var bats = [];
var numBats = 10;
var blockArrayLength = 3;
var titleScreen;
var backgroundScreen;
var instructionScreen;
var gameoverScreen;
var levelFrame;
var menuX;
var menuY;
var isMuted = false;
manifest = [
    {
        src: "TitleScreen.png",
        id: "title"
    },
    {
        src: "GameScreen.png",
        id: "background"
    },
    {
        src: "Instructions.png",
        id: "instructions"
    },
    {
        src: "GameOver.png",
        id: "gameover"
    },
    {
        src: "Sign.png",
        id: "levelsign"
    },
    {
        src: "buttons.png",
        id: "button"
    },
    {
        src: "32x32-bat-sprite.png",
        id: "bat"
    },
    {
        src: "goblins.png",
        id: "goblin"
    }
];


function loadFiles() {
    queue = new createjs.LoadQueue(true, imgSrc); //files are stored in 'images' directory
    queue.on("complete", loadComplete, this); //when loading is done run 'loadComplete()'
    queue.loadManifest(manifest); //load files listed in 'manifest'
}


function loadComplete(evt) {
    //once the files are loaded, put them into usable objects
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    backgroundScreen = new createjs.Bitmap(queue.getResult("background"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gameoverScreen = new createjs.Bitmap(queue.getResult("gameover"));
    levelFrame = new createjs.Bitmap(queue.getResult("levelsign"));

    addBackGroundToStage();
    Player();
    Enemy();
    addButtonsToStage();
    stage.update();

}

function addBackGroundToStage() {
    stage.addChild(titleScreen);
    stage.addChild(backgroundScreen);
    backgroundScreen.visible = false;

    stage.addChild(instructionScreen);
    instructionScreen.visible = false;

    stage.addChild(gameoverScreen);
    gameoverScreen.visible = false;

    stage.addChild(levelFrame);
    menuX = (CANVAS_WIDTH * 0.5);
    menuY = (CANVAS_HEIGHT * 0.5);
    levelFrame.x = menuX;
    levelFrame.y = menuY;
    levelFrame.visible = false;

    stage.addChild(timerText);
    timerText.visible = false;

}



function addButtonsToStage() {
    var buttonSheet = new createjs.SpriteSheet({
        images: [queue.getResult("button")],
        frames: [[0, 0, 94, 33, 0, 1, 1], [94, 0, 94, 33, 0, 1, 1], [0, 33, 94, 33, 0, 1, 1], [94, 33, 94, 33, 0, 1, 1], [0, 66, 94, 33, 0, 1, 1], [94, 66, 94, 33, 0, 1, 1], [0, 99, 94, 33, 0, 1, 1], [94, 99, 94, 33, 0, 1, 1], [0, 132, 94, 33, 0, 1, 1], [94, 132, 94, 33, 0, 1, 1], [0, 165, 94, 33, 0, 1, 1], [94, 165, 94, 33, 0, 1, 1], [0, 198, 94, 33, 0, 1, 1], [94, 198, 94, 33, 0, 1, 1], [0, 231, 94, 33, 0, 1, 1], [94, 231, 31, 31, 0, 0, 0], [125, 231, 31, 31, 0, 0, 0]],
        animations: {
            playUp: [0, 0, "playUp"],
            playOver: [1, 1, "playOver"],
            playDown: [2, 2, "playDown"],
            instructUp: [3, 3, "instructUp"],
            instructOver: [4, 4, "instructOver"],
            instructDown: [5, 5, "instructDown"],
            menuUp: [6, 6, "menuUp"],
            menuOver: [7, 7, "menuOver"],
            menuDown: [8, 8, "menuDown"],
            continueUp: [9, 9, "continueUp"],
            continueOver: [10, 10, "continueOver"],
            continueDown: [11, 11, "continueDown"],
            playAgainUp: [12, 12, "playAgainUp"],
            playAgainOver: [13, 13, "playAgainOver"],
            playAgainDown: [14, 14, "playAgainDown"],
            muteOff: [15, 15, "muteOff"],
            muteOn: [16, 16, "muteOn"]
        }
    });
    buttons = new createjs.Sprite(buttonSheet);
    buttons.x = (CANVAS_WIDTH * 0.5) - 25;
    buttons.y = (CANVAS_HEIGHT * 0.5);

    for (i = 0; i < blockArrayLength; i++) {
        buttons.x = (CANVAS_WIDTH * 0.5) - 30;
        buttons.y = (CANVAS_HEIGHT * 0.5) + i * 50;
        buttons.gotoAndStop(i * 3);
        blockArray.push(buttons.clone());
    }

    buttons.x = 10;
    buttons.y = CANVAS_HEIGHT - 40;
    buttons.gotoAndStop(15);
    blockArray.push(buttons.clone());


    for (j = 0; j < blockArray.length; j++) {
        stage.addChild(blockArray[j]);
    }
}

loadFiles();




function Enemy() {
    var data = new createjs.SpriteSheet({
        images: [queue.getResult("bat")],
        frames: {
            width: 32,
            height: 32
        },
        animations: {
            "Forward": {
                frames: [1, 2, 3],
                speed: 0.15
            },
            "Right": {
                frames: [5, 6, 7],
                speed: 0.25
            },
            "DeadRight": {
                frames: [4],
                speed: 1
            },
            "Left": {
                frames: [13, 14, 15],
                speed: 0.25
            },
            "DeadLeft": {
                frames: [12],
                speed: 1
            }
        }
    });

    bat = new createjs.Sprite(data);
    bat.scaleX = 1.25;
    bat.scaleY = 1.25;
    if (numBats % 2 != 0) {
        ++numBats;
    }

    for (i = 0; i < numBats / 2; ++i) {
        bat.y = 400 + (i * 30);

        bat.x = CANVAS_WIDTH - padX * 5;
        bat.gotoAndPlay("Left");
        var temp = bat.clone()
        temp.originX = CANVAS_WIDTH - padX * 5;
        temp.dirX = -1;
        temp.boundX = 0 - padX;
        bats.push(temp);

        bat.x = padX;
        bat.gotoAndPlay("Right");

        var temp2 = bat.clone()
        temp2.originX = padX;
        temp2.dirX = 1;
        temp2.boundX = CANVAS_WIDTH;
        bats.push(temp2);
    }

    for (i = 0; i < numBats; ++i) {
        stage.addChild(bats[i]);
        bats[i].visible = false;
    }
}

function Player() {
    var data = new createjs.SpriteSheet({
        images: [queue.getResult("goblin")],
        frames: {
            width: 51,
            height: 57.96666666666667
        },
        animations: {
            "AttackLeft": {
                frames: [0, 1, 2, 3, 4, 5],
                speed: 0.25,
                next: "WalkLeft"
            },
            "AttackRight": {
                frames: [6, 7, 8, 9, 10, 11],
                speed: 0.25,
                next: "WalkRight"
            },
            "WalkLeft": {
                frames: [12, 13, 14, 15, 16, 17, 18],
                speed: 0.4
            },
            "WalkRight": {
                frames: [19, 20, 21, 22, 23, 24, 25],
                speed: 0.4
            },
            "Death": {
                frames: [26, 27, 28, 29, 30],
                speed: 0.1
            }
        }
    });

    goblin = new createjs.Sprite(data);
    goblin.x = CANVAS_WIDTH * 0.5 - 25;
    goblin.y = 500;
    goblin.gotoAndPlay("WalkRight");
    stage.addChild(goblin);
    goblin.visible = false;
}