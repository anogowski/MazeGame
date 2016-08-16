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