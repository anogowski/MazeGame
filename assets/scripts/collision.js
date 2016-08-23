function bounds() {
    if (playerSprite.x < spriteImageSize) {
        playerSprite.x = spriteImageSize;
    } else if (playerSprite.x > CANVAS_SIZE - spriteImageSize * 2) {
        playerSprite.x = CANVAS_SIZE - spriteImageSize * 2;
    }

    if (playerSprite.y < spriteImageSize) {
        playerSprite.y = spriteImageSize;
    } else if (playerSprite.y > CANVAS_SIZE - spriteImageSize * 2) {
        playerSprite.y = CANVAS_SIZE - spriteImageSize * 2;
    }
}

function WallColliding() {

    for (var i = 0; i < walls.length; ++i) {
        var wall = walls[i];

        if (ndgmr.checkPixelCollision(playerSprite, wall.shape, 1, true)) {
            return true;
        }
    }
    return false;
}

function HitTests() {

    for (var i = 0; i < objectives.length; ++i) {
        
        var objective = objectives[i];

        if (ndgmr.checkPixelCollision(playerSprite, objective.shape, 1, true)) {



            if (objective.isKey) {
                hasKey = true;
                objective.gotten = true;
                objective.Remove();
            } else if (hasKey) {
                objective.gotten = true;
                objective.Remove();
                chestsGotten += 1;
                console.log("Power Up!");
            }
        }

    }

    var isInMud = false;
    var isInFire = false;
    for (var i = 0; i < obstacles.length; ++i) {

        var obstacle = obstacles[i];
    

        if (ndgmr.checkPixelCollision(playerSprite, obstacle.shape, 1, true)) {
            
            if((this.trapType %1) === (MudTrap % 1))
            {
                isInMud = true;
                isInFire = false;
            }
            else  if((this.trapType %1) === (LaserTrap % 1))
            {
                isInMud = false;
                isInFire = false;
            }
            else  if((this.trapType %1) === (FireTrap % 1))
            {
                isInMud = false;
                isInFire = true;
            }
        }
    }
    
    if(isInFire)
    {
        totalLostTime += 0.1;
    }
    
    if(isInMud)
    {
        speed = 2;
    }
    else
    {
        speed = 4;
    }

}



function FindTargetDirection(obstacle, xTarget, yTarget) {
    //!! TODO, set the xDirection and yDirection to be towards the target.
    var distanceToTargetX = xTarget - obstacle.x;
    var distanceToTargetY = yTarget - obstacle.y;
    obstacle.SetDirection(Math.round(distanceToTargetX / (FPS * 5) * 100) / 100, Math.round(distanceToTargetY / (FPS * 5) * 100) / 100);

    obstacle.SetTarget(obstacle.x + (obstacle.xDirection * 150), obstacle.y + (obstacle.yDirection * 150));


}