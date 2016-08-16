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



function FindTargetDirection(obstacle, xTarget, yTarget)
{
    //!! TODO, set the xDirection and yDirection to be towards the target.
    var distanceToTargetX = xTarget - obstacle.x;
    var distanceToTargetY = yTarget - obstacle.y;
    obstacle.SetDirection(Math.round(distanceToTargetX / (FPS * 5) * 100)/100, Math.round(distanceToTargetY / (FPS * 5)* 100)/100);
    
    obstacle.SetTarget(obstacle.x + (obstacle.xDirection * 150), obstacle.y + (obstacle.yDirection * 150));
    obstacle.Draw();
    
}

