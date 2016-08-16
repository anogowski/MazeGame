var stage;

var gameState;
//!! TODO, figure out what game states need to exist
var TITLE = 100;
var INSTRUCTIONS = 200;
var PLAY = 300;
var GAME_OVER = 400;
var FPS = 30;
var obstacleClearedColor = "#AAE";
var obstacleUnclearedColor = "#A66";
var TOTAL_GAME_TIME_NORMAL = 35;
var TOTAL_GAME_TIME_J = 10000;
var IS_EASYMODE = false;


var sprites;
var gameScore;
var titleContainer = new createjs.Container();
var instructonsContainer = new createjs.Container();
var playContainer = new createjs.Container();
var gameOverContainer = new createjs.Container();

var playerCharacter;
var hasKey = false;
var objectives;
var obstacles;

var playTime;
var gameOverTime;

var totalLostTime = 0;

var knightSheet;
var ninjaSheet;


function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 1600;
    canvas.height = 1200;
    stage = new createjs.Stage(canvas); //makes stage object from the canvas
    stage.addChild(titleContainer);
    stage.addChild(instructonsContainer);
    stage.addChild(playContainer);
    stage.addChild(gameOverContainer);
    instructonsContainer.visible = false;
    playContainer.visible = false;
    gameOverContainer.visible = false;

    
    // setup 
    

    
}
 
function setupMap()
{
    
    playerCharacter = new createjs.Sprite(ninjaSheet);
    playerCharacter.gotoAndPlay("stand");
        
    var firstKey = new createjs.Bitmap(queue.getResult("keyPNG"));
    var firstChest = new createjs.Bitmap(queue.getResult("chestPNG"));
    var secondChest = new createjs.Bitmap(queue.getResult("chestPNG"));
    var thirdChest = new createjs.Bitmap(queue.getResult("chestPNG"));
    
    
    var firstObjective = new Objective(firstKey, 300, 300, true);
    
    firstObjective.Draw();
    
    var secondObjective = new Objective(firstChest, 300, 700, false);
    secondObjective.Draw();

    var thirdObjective = new Objective(secondChest, 600, 600, false);
    thirdObjective.Draw();
    
    
    var fourthObjective = new Objective(thirdChest, 700, 100, false);
    fourthObjective.Draw();
    
    
    objectives = [firstObjective, secondObjective, thirdObjective, fourthObjective];
    
    playContainer.addChild(firstObjective.shape);
    playContainer.addChild(secondObjective.shape);
    playContainer.addChild(thirdObjective.shape);
    playContainer.addChild(fourthObjective.shape);
    playContainer.addChild(playerCharacter);
    
    playTime = new createjs.Text();
    playTime.x = 100;
    playTime.y = 50;
    playTime.scaleX = 5;
    playTime.scaleY = 5;
    playTime.text = "10";
    
    gameOverTime = new createjs.Text();
    gameOverTime.x = 400;
    gameOverTime.y = 400;
    gameOverTime.scaleX = 5;
    gameOverTime.scaleY = 5;
    gameOverTime.text = "10";
  
    
    playContainer.addChild(playTime);

    gameOverContainer.addChild(gameOverTime);

}

function RandomCoordinate() {
    return Math.floor(Math.random() * (800 - 100 + 1)) + 100;
}

function SetupObstacles()
{
    obstacles = [];
    for(var i = 0; i < 30; i++)
    {
        obstacles[i] = new Obstacle("#111", null, RandomCoordinate(), RandomCoordinate());
        
        obstacles[i].SetTarget(RandomCoordinate(), RandomCoordinate());
        FindTargetDirection(obstacles[i], obstacles[i].xTarget, obstacles[i].yTarget);
        obstacles[i].Draw();

        playContainer.addChild(obstacles[i].shape);
    }
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
        playContainer.removeChild(playerCharacter);
        playContainer.addChild(playerCharacter);
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
        this.shape = new createjs.Sprite(knightSheet);
        
        if(this.xDirection > 0)
        {
            this.shape.gotoAndPlay("walkRight");
        }
        else if( this.xDirection < 0)
        {
            this.shape.gotoAndPlay("walkLeft");
        }
        else if(this.yDirection > 0)
        {
            this.shape.gotoAndPlay("walkRight");
        }
        else if( this.yDirection < 0)
        {
            this.shape.gotoAndPlay("walkLeft");
        }
        
        
        this.shape.x = this.x;
        this.shape.y = this.y;
        playContainer.addChild(this.shape);
        playContainer.removeChild(playerCharacter);
        playContainer.addChild(playerCharacter);
    };
}

var cachedVersion = Date.now();
var jsEnd = ".js?a=" + cachedVersion;
manifest = [

    {src: "buttons.png", id: "button"},
    {src: "gameOver.png", id: "gameOverPNG"},
      
    {src: "chest.png", id: "chestPNG"},
    {src: "key.png", id: "keyPNG"},
  
    {src: "title.png", id: "titlePNG"},
    {src: "playBackground.png", id: "backgroundPNG"},
    {src: "ninja.png", id: "ninja"},
    {src: "knight.png", id: "knight"},
  
        {
        src: "failure.mp3",
        id: "fail"
    },
    {
        src: "success.mp3",
        id: "success"
    }
    
    
];


function loadComplete(evt) {
    //define the frames frome the loaded sprite sheet 
    //the frames data comes from the sprite sheet export from Flash
    //animations assigns labels to particular sets of frames so they can be accessed by that label
   
    ninjaSheet = new createjs.SpriteSheet({
        images: [queue.getResult("ninja")],
        frames: {"regX": 32, "height": 78, "count": 40, "regY": 0, "width":50},
        animations: {
            walkRight: [16, 23, "walkRight"],
            walkLeft: [8, 15, "walkLeft"], 
            stand: [0, 0, "stand"]
      
        }
    });
    
    
    knightSheet = new createjs.SpriteSheet({
    images: [queue.getResult("knight")],
        frames: {"regX": 32, "height": 92, "count": 40, "regY": 0, "width":70},
        animations: {
            walkRight: [16, 23, "walkRight"],
            walkLeft: [8, 15, "walkLeft"]
      
        }
    });
    
    
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
    menuButton.x = 200;
    menuButton.y = 900;
    menuButton.gotoAndPlay("menuUp");
    
    var instructionsButton= new createjs.Sprite(buttonSheet);
    instructionsButton.x = 400;
    instructionsButton.y = 900;
    instructionsButton.gotoAndPlay("instructUp");
    
    var playButton= new createjs.Sprite(buttonSheet);
    playButton.x = 600;
    playButton.y = 900;
    playButton.gotoAndPlay("playUp");
    
    menuButton.on("click", function(evt) { gameState = TITLE; 
                                        
                                      
                                         });
    
  
    
    instructionsButton.on("click", function(evt) { gameState = INSTRUCTIONS; 
                                        
                                                 });
    
   
    
    playButton.on("click", function(evt) { gameState = PLAY; 
                                
                                         });
    

    
    
    // order of added determines what shows on top.
    titleContainer.addChild(new createjs.Bitmap(queue.getResult("titlePNG")));
    
    
    var instructions = new createjs.Text("Use the arrowkeys to move your character around. Collect the Key to open the chests. Open all the chests before the time limit is over. If a guard catches you, the time you have to open all the chests shortens. ")
    
       instructions.scaleX = 5;
    instructions.scaleY = 5;
    instructions.lineWidth = 300;
    instructonsContainer.addChild(instructions);
    gameOverMap = new createjs.Bitmap(queue.getResult("gameOverPNG"));
    gameOverMap.x = 300;
    gameOverContainer.addChild(gameOverMap);
    
    var credits = new createjs.Text();
    credits.x = 100;
    credits.y = 50;
    credits.scaleX = 5;
    credits.scaleY = 5;
    credits.text = "Credits go to Benjamin Lofgreen! Yay!";
    credits.x = 100;
    credits.y = 700;
    gameOverContainer.addChild(credits);
    playContainer.addChild(new createjs.Bitmap(queue.getResult("backgroundPNG")));
    
    
    
    
    stage.addChild(menuButton);
    stage.addChild(instructionsButton);
    stage.addChild(playButton);
    
    setupMap();
    SetupObstacles();

}



function loadFiles() {
    createjs.Sound.alternateExtensions = ["mp3"];
    queue = new createjs.LoadQueue(true, "assetsLocation/");
      queue.installPlugin(createjs.Sound);
    queue.on("complete", loadComplete, this);
    queue.loadManifest(manifest);
    
}

function main() {
    setupCanvas(); //sets up the canvas
  
    loadFiles();
 

    init();

}
main();



function mouseInit()
{
    stage.enableMouseOver();

}

function init()
{
    mouseInit();
    
    createjs.Ticker.addEventListener("tick", loop);
    createjs.Ticker.setFPS(FPS);
}



function loop()
{
    var switchState = false;
    switch(gameState)
    {
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
                
            if(gameTimeLeft <= 0 )
            {
                switchState = true;
                PlayFailSound();
            }
            else if(ObjectivesComplete())
            {
                switchState = true;
                PlaySuccessSound();
            }    
            
            else{
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
    if(switchState)
    {
        gameState = GAME_OVER;
    }

    stage.update();
   
}

var frameCount = 0;
var gameTimeLeft = 5;

function ObjectivesComplete()
{
    var complete = true;
    
    for(var i = 0; i < objectives.length; i++)
    {
        if(!objectives[i].gotten)
        {
            complete = false;
            i = objectives.length;
        }
    }
    
    return complete;
}

function updateTime()
{
    
     frameCount += 1;
     if(frameCount % (FPS / 10) === 0) {
         if(IS_EASYMODE === true)
         {
            gameTimeLeft = TOTAL_GAME_TIME_J - ( frameCount / (FPS)) - totalLostTime;
         }
         else{
             gameTimeLeft = TOTAL_GAME_TIME_NORMAL - ( frameCount / (FPS))- totalLostTime;
         
         }
        playTime.text = Math.round(gameTimeLeft);
        
         if((Math.round(gameTimeLeft * 100 ) / 100) > 0)
        {
            gameOverTime.text = "GREAT JOB! You had " + (Math.round(gameTimeLeft *100)/100) + " seconds left!";
            
      
        
        }
        else
        {
            gameOverTime.text = "You lost!";
             
        }
        
    }

}
             
function HitTests()
{

    
    for(var i = 0; i < objectives.length; i++)
    {
        
        
        
        var objective = objectives[i];
        
        hitTest = playerCharacter.globalToLocal(objectives[i].x, objectives[i].y);
        if(playerCharacter.hitTest(hitTest.x, hitTest.y))
        {
            
            
            
            if(objective.isKey)
            {
                hasKey = true;
                objective.gotten = true;
                objective.Remove();
            }
            else if(hasKey)
            {
                objective.gotten = true;
                objective.Remove();
            }
        }

    }
    
    for(var i = 0; i < obstacles.length; i++)
    {
        hitTest = playerCharacter.globalToLocal(obstacles[i].x, obstacles[i].y);
        if(playerCharacter.hitTest(hitTest.x, hitTest.y))
        {
            totalLostTime += 1;
      
            
            obstacles[i].Remove();
        }
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

// need either a global mouseText, or get it with document.getElementByID()
function MoveObjects()
{
    
    playerCharacter.x += xDirection;
    playerCharacter.y += yDirection;
    
    for(var i = 0; i < obstacles.length; i++)
    {
        
        if(obstacles[i].x >= obstacles[i].xTarget-1 && obstacles[i].x <= obstacles[i].xTarget+1 )
        {
            if(obstacles[i].y >= obstacles[i].yTarget-1 && obstacles[i].y <= obstacles[i].yTarget+1 )
            {
                obstacles[i].x = obstacles[i].xTarget;
                obstacles[i].y = obstacles[i].yTarget;
                obstacles[i].shape.x = obstacles[i].xTarget;
                obstacles[i].shape.y = obstacles[i].yTarget;
                obstacles[i].xTarget = RandomCoordinate();
                obstacles[i].yTarget = RandomCoordinate();
                FindTargetDirection(obstacles[i], obstacles[i].xTarget, obstacles[i].yTarget);
            }
            else
            {

                obstacles[i].x += obstacles[i].xDirection;
                obstacles[i].y += obstacles[i].yDirection;
                obstacles[i].shape.x += obstacles[i].xDirection;
                obstacles[i].shape.y += obstacles[i].yDirection;
            }
      
        }

        else
        {
            
            obstacles[i].x += obstacles[i].xDirection;
            obstacles[i].y += obstacles[i].yDirection;
            obstacles[i].shape.x += obstacles[i].xDirection;
            obstacles[i].shape.y += obstacles[i].yDirection;
        }
      
    }
}

function FindTargetDirection(obstacle, xTarget, yTarget)
{
    //!! TODO, set the xDirection and yDirection to be towards the target.
    var distanceToTargetX = xTarget - obstacle.x;
    var distanceToTargetY = yTarget - obstacle.y;
    obstacle.SetDirection(Math.round(distanceToTargetX / (FPS * 5) * 100)/100, Math.round(distanceToTargetY / (FPS * 5)* 100)/100);
    
    obstacle.SetTarget(obstacle.x + (obstacle.xDirection * 150), obstacle.y + (obstacle.yDirection * 150));
    obstacle.Draw();
    
}



var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_J = 74;

// Direction is based on KEYCODE down
var xDirection = 0;
var yDirection = 0;

function handleKeyDown(evt) {
    if(!evt){ var evt = window.event; }  //browser compatibility
    switch(evt.keyCode) {
        case KEYCODE_LEFT:  xDirection = -3;    playerCharacter.gotoAndPlay("walkLeft");    return false;
        case KEYCODE_RIGHT: xDirection = 3;     playerCharacter.gotoAndPlay("walkRight");   return false;
        case KEYCODE_UP:    yDirection = -3; if(xDirection === 0) { playerCharacter.gotoAndPlay("walkRight"); }  return false;
        case KEYCODE_DOWN:  yDirection = 3;  if(xDirection === 0) { playerCharacter.gotoAndPlay("walkLeft");  }   return false;
    
    }
    console.log(evt.keyCode+" down");
}

function handleKeyUp(evt) {
    if(!evt){ var evt = window.event; }  //browser compatibility
    switch(evt.keyCode) {
        case KEYCODE_LEFT:  if(yDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   xDirection = 0; break;
        case KEYCODE_RIGHT: if(yDirection ==0){ playerCharacter.gotoAndPlay("stand");    }  xDirection = 0; break;
        case KEYCODE_UP:    if(xDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   yDirection = 0; break;
        case KEYCODE_DOWN:  if(xDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   yDirection = 0; break;
        case KEYCODE_J: IS_EASYMODE = !IS_EASYMODE; break;
    }
   
}
 
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;