 var block;
 var levelArray = [];
 var grid = [];
 var spriteImageSize = 32;
 var playerImgSizeX = 32;
 var playerImgSizeY = 36;

 var numBorder;
var terrainData;
 manifest = [
         {src: "buttons.png", id: "button"},
    {src: "gameOver.png", id: "gameOverPNG"},
      
    {src: "chest.png", id: "chestPNG"},
    {src: "key.png", id: "keyPNG"},
  
    {src: "title.png", id: "titlePNG"},
    {src: "playBackground.png", id: "backgroundPNG"},
    {src: "warrior_m.png", id: "warrior_m"},
     {
         src: "sprites.png",
         id: "sprites"
    },
     {
         src: "ninja_m.png",
         id: "ninja_m"
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
     loadChest();
     
     playerSprite = loadPlayerSprite("ninja_m");
     playContainer.addChild(playerSprite); 
    
    setupMap();
    SetupObstacles();
    SetupWalls();
     
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);

    loop();
    stage.update();

 }


function Objective(  _shape,  _x,  _y, _isKey)
{
 
    this.shape = _shape
    this.x = _x;
    this.y = _y;
    this.isKey = _isKey;
    this.gotten = false;

    this.Remove = function()
    {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;
        this.SetDirection(0, 0);
        playContainer.removeChild(this.shape);
    }
    
    this.Draw = function()
    {
        console.log("redrawing");
        playContainer.removeChild(this.shape);
        if(this.isKey)
        {
            this.shape = new createjs.Bitmap(queue.getResult("keyPNG"));
            this.shape.scaleX = 0.3;
            this.shape.scaleY = 0.4;
            this.shape.regX = 10;
            this.shape.regY = 10;
            
        }
        else
        {
            this.shape = new createjs.Bitmap(queue.getResult("chestPNG"));
          
            this.shape.scaleX = 0.15;
            this.shape.scaleY = 0.2;
            this.shape.regX = 20;
            this.shape.regY = 20;
            
        }
        
        this.shape.x = this.x;
        this.shape.y = this.y;
        playContainer.addChild(this.shape);
        playContainer.removeChild(playerSprite);
        playContainer.addChild(playerSprite);
    };
}

function Obstacle(_color, _shape, _x, _y)
{
    this.color = _color;
    this.shape = _shape
    this.x = _x;
    this.y = _y;
    this.xDirection = 0;
    this.yDirection = 0;
   
    this.xTarget = 0;
    this.yTarget = 0;
    
    this.SetTarget = function(_x, _y)
    {
        this.xTarget = _x;
        this.yTarget = _y;
    }
    
    this.Remove = function()
    {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;
        this.SetDirection(0, 0);
        playContainer.removeChild(this.shape);
    }
    
    this.SetDirection = function(_x, _y)
    {
        this.xDirection = _x;
        this.yDirection = _y;
    }
    
    this.Draw = function()
    {
        
        playContainer.removeChild(this.shape);
        var newSprite = loadPlayerSprite("warrior_m");
       
        
        if(this.xDirection > 0)
        {
            newSprite.gotoAndPlay("WalkRight");
        }
        else if( this.xDirection < 0)
        {
            newSprite.gotoAndPlay("WalkLeft");
        }
        else if(this.yDirection > 0)
        {
            newSprite.gotoAndPlay("WalkUp");
        }
        else if( this.yDirection < 0)
        {
            newSprite.gotoAndPlay("WalkDown");
        }
         this.shape = newSprite;
        
        this.shape.x = this.x;
        this.shape.y = this.y;
        playContainer.addChild(this.shape);
        playContainer.removeChild(playerSprite);
        playContainer.addChild(playerSprite);
    };
}

function Wall(  _shape,  _x,  _y)
{
 
    this.shape = _shape
    this.x = _x;
    this.y = _y;
    
    

    this.Remove = function()
    {
        this.x = -500;
        this.y = -500;
        this.shape.x = -500;
        this.shape.y = -500;
    
        playContainer.removeChild(this.shape);
    }
    
    this.Draw = function()
    {
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

function SetupObstacles()
{
    obstacles = [];
    for(var i = 0; i < 30; i++)
    {
        obstacles[i] = new Obstacle("#111", loadPlayerSprite("warrior_m"), RandomCoordinate(), RandomCoordinate());
        
        obstacles[i].SetTarget(RandomCoordinate(), RandomCoordinate());
        FindTargetDirection(obstacles[i], obstacles[i].xTarget, obstacles[i].yTarget);
        

        playContainer.addChild(obstacles[i].shape);
        obstacles[i].Draw();
    }
}

function SetupWalls()
{
    walls = [];
    for(var i = 0; i < 30; i++)
    {
        walls[i] = new Wall(new createjs.Sprite(terrainData), i * spriteImageSize, 100);
        playContainer.addChild(walls[i].shape);
        walls[i].Draw();
    }
}

function setupMap()
{
        
   
    var firstKey = new createjs.Bitmap(queue.getResult("keyPNG"));

    
    
    
    
    var secondObjective = new Objective(firstKey, 400, 30, true);
    


    
    
    
    objectives = [ secondObjective];
    

    playContainer.addChild(secondObjective.shape);
   
    playContainer.addChild(playerSprite);
    
    
    secondObjective.Draw();
    
    
    playTime = new createjs.Text();
    playTime.x = 100;
    playTime.y = 50;
    playTime.scaleX = 5;
    playTime.scaleY = 5;
    playTime.text = "10";
    
  
  
    
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

     block = new createjs.Sprite(terrainData);
     block.gotoAndStop("Castle");
     
     

    
    var buttonSheet = new createjs.SpriteSheet({
        images: [queue.getResult("button")],
        frames: [[0,0,94,33,0,1,1],[94,0,94,33,0,1,1],[0,33,94,33,0,1,1],[94,33,94,33,0,1,1],[0,66,94,33,0,1,1],[94,66,94,33,0,1,1],[0,99,94,33,0,1,1],[94,99,94,33,0,1,1],[0,132,94,33,0,1,1],[94,132,94,33,0,1,1],[0,165,94,33,0,1,1],[94,165,94,33,0,1,1],[0,198,94,33,0,1,1],[94,198,94,33,0,1,1],[0,231,94,33,0,1,1],[94,231,31,31,0,0,0],[125,231,31,31,0,0,0]],
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
    menuButton.y = 550;
    menuButton.gotoAndPlay("menuUp");
    
    var instructionsButton= new createjs.Sprite(buttonSheet);
    instructionsButton.x = 200;
    instructionsButton.y = 550;
    instructionsButton.gotoAndPlay("instructUp");
    
    var playButton= new createjs.Sprite(buttonSheet);
    playButton.x = 100;
    playButton.y = 550;
    playButton.gotoAndPlay("playUp");
    
    menuButton.on("click", function(evt) { gameState = TITLE; });
    
    instructionsButton.on("click", function(evt) { gameState = INSTRUCTIONS; });

    playButton.on("click", function(evt) { gameState = PLAY; });
    
    // order of added determines what shows on top.
    titleContainer.addChild(new createjs.Bitmap(queue.getResult("titlePNG")));
    
    
    var instructions = new createjs.Text("Use the arrowkeys to move your character around. Collect the Key to open the chests. Open all the chests before the time limit is over. If a guard catches you, the time you have to open all the chests shortens. ")
    
    instructions.scaleX = 5;
    instructions.scaleY = 5;
    instructions.lineWidth = 300;
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
     characterSprite.scaleY = 0.88
     characterSprite.gotoAndPlay("WalkUp");
 
     return characterSprite;
 }

 function loadChest() {
     chestX = 32;
     chestY = 20;
     var data = new createjs.SpriteSheet({
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

     chest = new createjs.Sprite(data);
     chest.scaleY = 1.6;

     chest.x = 320;
     chest.y = 320;
     chest.gotoAndStop("Blue");

     playContainer.addChild(chest);

 }


 function gridSetup() {
     numBorder = CANVAS_SIZE / spriteImageSize;

     for (i = 0; i < numBorder; ++i) {

         for (j = 0; j < numBorder; ++j) {
             x = i * 32;
             y = j * 32;

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


function PlaySuccessSound()
{
    createjs.Sound.play( "success" );
}

function PlayFailSound()
{
    createjs.Sound.play( "fail" );
}
