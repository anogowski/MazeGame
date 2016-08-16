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
 
}
 
function RandomCoordinate() {
    return Math.floor(Math.random() * (800 - 100 + 1)) + 100;
}




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
             



function PlaySuccessSound()
{
    createjs.Sound.play( "success" );
}

function PlayFailSound()
{
    createjs.Sound.play( "fail" );
}

// need either a global mouseText, or get it with document.getElementByID()



