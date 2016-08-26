var block;
var levelArray = [];
var grid = [];
var spriteImageSize = 32;
var playerImgSizeX = 32;
var playerImgSizeY = 36;

var numBorder;
var terrainData;
var chestData;
var laserVTrapData;
var laserHTrapData;
var fireTrapData;
manifest = [
    {
        src: "buttons.png",
        id: "button"
     },
    {
        src: "gameOver.png",
        id: "gameOverPNG"
     },
    {
        src: "key.png",
        id: "keyPNG"
     },

    {
        src: "title.png",
        id: "titlePNG"
     },
    {
        src: "playBackground.png",
        id: "backgroundPNG"
     },
    {
        src: "warrior_m.png",
        id: "warrior_m"
     },
    {
        src: "sprites.png",
        id: "sprites"
    },
    {
        src: "ninja_m.png",
        id: "ninja_m"
    },
    {
        src: "laserV.png",
        id: "laserVTrap"
    },
    {
        src: "laserH.png",
        id: "laserHTrap"
    },
    {
        src: "fire.png",
        id: "fireTrap"
    },
    {
        src: "chests.png",
        id: "chest"
    },
    {
        src: "failure.mp3",
        id: "fail"
    },
    {
        src: "success.mp3",
        id: "success"
    }
];


function loadFiles() {
    queue = new createjs.LoadQueue(true, imgSrc); //files are stored in 'images' directory
    queue.on("complete", loadComplete, this); //when loading is done run 'loadComplete()'
    queue.loadManifest(manifest); //load files listed in 'manifest'
}


function loadComplete(evt) {
    loadSprites();

    gridSetup();
    boardSetup();

    playerSprite = loadPlayerSprite("ninja_m");
    playContainer.addChild(playerSprite);

    setupMap();
    //SetupObstacles();
    SetupWalls(3);
    timeSetup();
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);

    loop();
    stage.update();

}


function Objective(_shape, _x, _y, _isKey) {

    this.shape = _shape
    this.x = _x;
    this.y = _y;
    this.isKey = _isKey;
    this.gotten = false;

    this.Remove = function () {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;

        playContainer.removeChild(this.shape);
    }

    this.Draw = function () {
        console.log("redrawing");
        playContainer.removeChild(this.shape);
        if (this.isKey) {
            this.shape = new createjs.Bitmap(queue.getResult("keyPNG"));


        } else {
            this.shape = new createjs.Sprite(chestData);

            this.shape.scaleY = 1.6;

        }

        this.shape.x = this.x;
        this.shape.y = this.y;
        playContainer.addChild(this.shape);
        playContainer.removeChild(playerSprite);
        playContainer.addChild(playerSprite);
    };
}

var MudTrap = 100;
var LaserVTrap = 200;
var LaserHTrap = 400;
var FireTrap = 300;


function Obstacle(_trapType, _shape, _x, _y, _timeOn, _timeOff) {

    this.trapType = _trapType;
    this.shape = _shape
    this.x = _x;
    this.y = _y;
    this.timeOn = _timeOn;
    this.timeOff = _timeOff;
    this.isOn = true;
    this.currentTime = _timeOn;

    this.Remove = function () {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;

        playContainer.removeChild(this.shape);
    }


    this.Draw = function () {

        playContainer.removeChild(this.shape);

        var newShape = null;

        if (this.isOn) {
            if ((this.trapType) === (MudTrap)) {

                block.gotoAndStop("Dirt");
                newShape = block.clone();

            } else if ((this.trapType) === (LaserVTrap)) {

                newShape = new createjs.Sprite(laserVTrapData);

                newShape.gotoAndPlay("fire");



            } else if ((this.trapType) === (FireTrap)) {

                newShape = new createjs.Sprite(fireTrapData);
                newShape.scaleX = 0.5;
                newShape.scaleY = 0.5;

                newShape.gotoAndPlay("fire");


            }


            this.shape = newShape;

            this.shape.x = this.x;
            this.shape.y = this.y;
            playContainer.addChild(this.shape);
            playContainer.removeChild(playerSprite);
            playContainer.addChild(playerSprite);
        }

    };
}



function Wall(_shape, _x, _y) {

    this.shape = _shape
    this.x = _x;
    this.y = _y;



    this.Remove = function () {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;

        playContainer.removeChild(this.shape);
    }

    this.Draw = function () {
        console.log("redrawing");
        playContainer.removeChild(this.shape);

        this.shape = new createjs.Sprite(terrainData);
        this.shape.gotoAndStop("Castle");

        this.shape.x = this.x;
        this.shape.y = this.y;
        playContainer.addChild(this.shape);

    };
}


function RandomCoordinate() {
    return Math.floor(Math.random() * (800 - 100 + 1)) + 100;
}

function SetupObstacles() {
    obstacles = [];



}

function SetupWalls(levelIndex = 2) {
    walls = [];

    if (levelIndex == 1) {
        Level1();
    } else if (levelIndex == 2) {
        Level2();

    } else if (levelIndex == 3) {
        Level3();
    }

    for (i = 0; i < walls.length; ++i) {
        playContainer.addChild(walls[i].shape);
        walls[i].Draw();
    }
}


function Level1() {
    var index = 0;
    var maxi = 0;

    makeTrap(23, 200);
    makeTrap(24, 200);
    makeWall(25);

    makeTrap(43, 200);
    makeTrap(44, 200);
    makeWall(45);

    index = 63;
    maxi = 2;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    index = 70;
    maxi = 5;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(85);
    makeWall(90);

    makeWall(105);
    makeWall(110);



    index = 115;
    maxi = 4;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(125);
    makeWall(130);
    makeWall(135);

    makeWall(145);
    makeWall(150);
    makeWall(155);

    makeTrap(165, 300)
    makeWall(175);

    makeWall(185);
    makeWall(195);


    makeWall(205);
    makeWall(215);

    makeWall(225);


    index = 230;
    maxi = 5;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeWall(245);
    makeWall(250);

    makeWall(265);
    makeWall(270);

    makeWall(285);
    makeWall(290);

    makeWall(305);
    makeWall(310);

    makeWall(330);

    makeWall(350);

    makeTrap(370, 200);

}

function Level2() {
    var index = 61;
    var maxi = 8;

    makeWall(31);
    makeTrap(33, 100);
    makeWall(37);

    makeWall(51);
    makeWall(55);

    index = 61;
    maxi = 8;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    index = 71;
    maxi = 6;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeWall(89);
    makeWall(97);

    index = 102;
    maxi = 5;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(109);

    index = 111;
    maxi = 6;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeWall(122);
    makeWall(127);
    makeWall(129);
    makeWall(131);

    makeWall(142);
    makeWall(147);
    makeWall(149);
    makeWall(151);

    index = 153;
    maxi = 4;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeWall(162);
    makeWall(167);
    makeWall(171);

    makeWall(173);

    makeWall(182);
    makeWall(187);
    makeWall(191);
    makeWall(193);

    makeWall(202);

    index = 207;
    maxi = 4;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(213);
    makeWall(216);
    makeWall(217);

    makeWall(222);
    makeWall(233);
    makeWall(236);

    index = 242;
    maxi = 11;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }
    makeWall(256);
    makeWall(258);

    makeWall(276);

    index = 281;
    maxi = 16;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeWall(304);
    makeWall(308);
    makeWall(312);
    makeWall(316);

    makeWall(322);
    makeWall(326);
    makeWall(330);
    makeWall(334);
    makeWall(336);


    index = 342;
    maxi = 14;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }
}

function Level3() {
    makeWall(23);
    makeTrap(24, 300);
    makeTrap(28, 300);
    makeTrap(32, 300);

    makeWall(43);

    makeTrap(44, 200);

    index = 45;
    maxi = 6;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(63);
    makeTrap(64, 100);

    makeWall(65);

    index = 71;
    maxi = 6;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(83);
    makeTrap(84, 100);
    makeWall(85);
    makeWall(87);
    makeTrap(90, 300);
    makeWall(94);

    makeTrap(103, 200);
    makeTrap(104, 100);

    makeWall(105);
    makeWall(107);
    makeWall(112);
    makeWall(116);
    makeWall(123);
    makeWall(125);
    makeWall(127);
    makeTrap(130, 300);
    makeWall(134);
    makeWall(138);

    index = 45;
    maxi = 2;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }
    makeWall(147);
    makeWall(152);
    makeWall(156);
    makeWall(167);
    makeTrap(170, 300);
    makeWall(174);

    index = 181;
    maxi = 16;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }


    makeTrap(205, 200);
    makeTrap(210, 200);
    makeTrap(215, 200);


    index = 222;
    maxi = 16;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }
    makeWall(242);

    index = 262;
    maxi = 8;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(272);
    makeTrap(273, 300);

    index = 274;
    maxi = 3;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(286);
    makeWall(290);
    makeWall(292);
    makeTrap(293, 300);
    makeWall(294);
    makeTrap(297, 200);
    makeWall(303);
    makeWall(304);
    makeWall(306);
    makeWall(308);
    makeWall(310);
    makeWall(312);
    makeTrap(313, 300);
    makeWall(314);
    makeWall(317);
    makeWall(323);
    makeWall(326);
    makeWall(328);
    makeWall(332);
    makeTrap(333, 100);
    makeTrap(334, 200);
    makeWall(337);
    makeWall(343);
    makeWall(345);
    makeWall(346);

    index = 348;
    maxi = 9;
    for (var i = 0; i <= maxi; ++i) {
        makeHWall(i, index);
    }

    makeWall(363);

    makeTrap(364, 100);
    makeTrap(365, 200);
    makeTrap(369, 100);
    makeTrap(370, 200);
    makeTrap(374, 100);
    makeTrap(375, 200);
}

function makeWall(index) {
    walls.push(new Wall(new createjs.Sprite(terrainData), grid[index].x, grid[index].y));
}

function makeHWall(i, index) {
    walls.push(new Wall(new createjs.Sprite(terrainData), grid[i + index].x, grid[index].y));
}

function makeTrap(index, type) {

    if (type === MudTrap) {

        block.gotoAndStop("Dirt");
        var obstacle = new Obstacle(type, block.clone(), grid[index].x, grid[index].y, 100, 100);
        obstacles.push(obstacle);
        obstacle.Draw();
    } else if ((type) === (LaserVTrap)) {
        var newSprite = new createjs.Sprite(laserVTrapData);
        newSprite.gotoAndPlay("fire");
        var obstacle = new Obstacle(type, newSprite, grid[index].x, grid[index].y, 100, 100);
        obstacles.push(obstacle);
        obstacle.Draw();
    } else if ((type) === (FireTrap)) {
        var newSprite = new createjs.Sprite(fireTrapData);
        newSprite.scaleX = 0.5;
        newSprite.scaleY = 0.5;
        newSprite.gotoAndPlay("fire");

        var obstacle = new Obstacle(type, newSprite, grid[index].x, grid[index].y, 100, 50);

        obstacles.push(obstacle);
        obstacle.Draw();
    }

}

function setupMap() {
    chestX = 32;
    chestY = 20;
    chestData = new createjs.SpriteSheet({
        images: [queue.getResult("chest")],
        frames: {
            width: chestX,
            height: chestY
        },
        animations: {
            "Red": {
                frames: [0]
            },
            "Blue": {
                frames: [1]
            },
            "Yellow": {
                frames: [2]
            },
            "Green": {
                frames: [3]
            }
        }
    });

    var chestShape = new createjs.Sprite(chestData);
    chestShape.scaleY = 1.6;

    chestShape.x = grid[124].x;
    chestShape.y = grid[124].y;
    chestShape.gotoAndStop("Blue");

    var chestShape2 = new createjs.Sprite(chestData);
    chestShape2.scaleY = 1.6;

    chestShape2.x = grid[335].x;
    chestShape2.y = grid[335].y;
    chestShape2.gotoAndStop("Red");


    var firstObjective = new Objective(chestShape, grid[124].x, grid[124].y, false);
    var secondObjective = new Objective(chestShape2, grid[335].x, grid[335].y, false);




    var firstKey = new createjs.Bitmap(queue.getResult("keyPNG"));

    var thirdObjective = new Objective(firstKey, 400, 50, true);

    objectives = [firstObjective, secondObjective, thirdObjective];



    playContainer.addChild(firstObjective.shape);
    playContainer.addChild(secondObjective.shape);
    playContainer.addChild(thirdObjective.shape);




    firstObjective.Draw();
    secondObjective.Draw();
    thirdObjective.Draw();


    playTime = new createjs.Text("", "", "#F00");
    playTime.x = 180;
    playTime.y = 3;
    playTime.scaleX = 3;
    playTime.scaleY = 3;
    playTime.text = "10";



    playContainer.addChild(playerSprite);
    playContainer.addChild(playTime);

    gameOverContainer.addChild(gameOverTime);

}

function loadSprites() {
    terrainData = new createjs.SpriteSheet({
        images: [queue.getResult("sprites")],
        frames: {
            width: spriteImageSize,
            height: spriteImageSize
        },
        animations: {
            "Castle": {
                frames: [0]
            },
            "Wood": {
                frames: [1]
            },
            "Grass": {
                frames: [2]
            },
            "Dirt": {
                frames: [3]
            },
            "Water": {
                frames: [4]
            }
        }
    });

    fireTrapData = new createjs.SpriteSheet({
        images: [queue.getResult("fireTrap")],
        frames: {
            width: 64,
            height: 64
        },
        animations: {
            "fire": {
                frames: [0, 1, 2, 3],
                speed: 0.2
            }
        }
    });


    laserVTrapData = new createjs.SpriteSheet({
        images: [queue.getResult("laserVTrap")],
        frames: {
            width: spriteImageSize,
            height: spriteImageSize
        },
        animations: {
            "fire": {
                frames: [0, 1, 2],
                speed: 0.2
            }
        }
    });

    block = new createjs.Sprite(terrainData);
    block.gotoAndStop("Castle");




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


    var menuButton = new createjs.Sprite(buttonSheet);
    menuButton.x = 300;
    menuButton.y = 600;
    menuButton.gotoAndPlay("menuUp");

    var instructionsButton = new createjs.Sprite(buttonSheet);
    instructionsButton.x = 200;
    instructionsButton.y = 600;
    instructionsButton.gotoAndPlay("instructUp");

    var playButton = new createjs.Sprite(buttonSheet);
    playButton.x = 100;
    playButton.y = 600;
    playButton.gotoAndPlay("playUp");

    menuButton.on("click", function (evt) {
        gameState = TITLE;
    });

    instructionsButton.on("click", function (evt) {
        gameState = INSTRUCTIONS;
    });

    playButton.on("click", function (evt) {
        gameState = PLAY;



    });

    // order of added determines what shows on top.
    titleContainer.addChild(new createjs.Bitmap(queue.getResult("titlePNG")));


    var instructions = new createjs.Text("Use the arrowkeys or WASD to move your character around. Collect the Key to open the chests. Open all the chests before the time limit is over. Getting a chest increases the time remaining. ")

    instructions.scaleX = 5;
    instructions.scaleY = 5;
    instructions.lineWidth = 100;
    instructonsContainer.addChild(instructions);
    gameOverMap = new createjs.Bitmap(queue.getResult("gameOverPNG"));

    gameOverContainer.addChild(gameOverMap);



    playContainer.addChild(new createjs.Bitmap(queue.getResult("backgroundPNG")));




    stage.addChild(menuButton);
    stage.addChild(instructionsButton);
    stage.addChild(playButton);
    stage.update();
}

function loadPlayerSprite(fileName) {
    var data = new createjs.SpriteSheet({
        images: [queue.getResult(fileName)],
        frames: {
            width: playerImgSizeX,
            height: playerImgSizeY
        },
        animations: {
            "WalkUp": {
                frames: [0, 1, 2],
                speed: 0.1
            },
            "WalkRight": {
                frames: [3, 4, 5],
                speed: 0.1
            },
            "WalkDown": {
                frames: [6, 7, 8],
                speed: 0.1
            },
            "WalkLeft": {
                frames: [9, 10, 11],
                speed: 0.1
            }
        }
    });

    var characterSprite = new createjs.Sprite(data);

    characterSprite.x = 32;
    characterSprite.y = 32;
    characterSprite.scaleX = 0.90;
    characterSprite.scaleY = 0.78;
    characterSprite.gotoAndPlay("WalkUp");

    return characterSprite;
}



function gridSetup() {
    numBorder = CANVAS_SIZE / spriteImageSize;

    for (i = 0; i < numBorder; ++i) {

        for (j = 0; j < numBorder; ++j) {
            x = j * 32;
            y = i * 32;

            grid.push({
                x: x,
                y: y
            });
        }
    }
}

function boardSetup() {

    var numBorder = CANVAS_SIZE / spriteImageSize;

    for (i = 0; i < grid.length; ++i) {
        x = grid[i].x;
        y = grid[i].y;

        block.x = x;
        block.y = y;

        if (x == 0 || x == CANVAS_SIZE - spriteImageSize || y == 0 || y == CANVAS_SIZE - spriteImageSize) {
            block.gotoAndStop("Castle");
        } else {
            block.gotoAndStop("Grass");
        }
        levelArray.push(block.clone());
    }

    for (i = 0; i < levelArray.length; ++i) {
        playContainer.addChild(levelArray[i]);
    }
}

function resetPlay() {

    totalLostTime = 0;
    gameTimeLeft = 5;
    frameCount = 0;
    for (var i = 0; i < objectives.length; i++) {
        objectives[i].Remove();
        playContainer.removeChild(objectives[i].shape);


    }
    playContainer.removeChild(playerSprite);
    playContainer.removeChild(playTime);

    gameOverContainer.removeChild(gameOverTime);

    playerSprite = loadPlayerSprite("ninja_m");
    setupMap();
    chestsGotten = 0;

}


function PlaySuccessSound() {
    createjs.Sound.play("success");
}

function PlayFailSound() {
    createjs.Sound.play("fail");
}