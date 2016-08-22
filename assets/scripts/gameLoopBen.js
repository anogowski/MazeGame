
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

function MoveObjects()
{
    
        if (wDown || upDown) {
            playerSprite.y -= speed;
            if(WallColliding())
            {
                playerSprite.y += speed;
            }
        } else if (sDown || downDown) {
            
            playerSprite.y += speed;
            if(WallColliding())
            {
                playerSprite.y -= speed;
            }
            
        }

        if (aDown || leftDown) {
            playerSprite.x -= speed;
                   if(WallColliding())
            {
               playerSprite.x += speed;
            }
            
        } else if (dDown || rightDown) {
            playerSprite.x += speed;
                   if(WallColliding())
            {
                playerSprite.x -= speed;
            }
        }

        bounds();
    
    
    
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

var frameCount = 0;
var gameTimeLeft = 5;
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