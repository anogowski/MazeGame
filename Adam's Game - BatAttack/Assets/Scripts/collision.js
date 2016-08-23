var padX = 10;
var padY = 75;
var grassTop = 300;

function bounds() {
    if (goblin.x >= CANVAS_WIDTH - (padX * 5)) {
        goblin.x = CANVAS_WIDTH - (padX * 5);
    } else if (goblin.x <= 0 + padX) {
        goblin.x = padX;
    }

    if (goblin.y >= CANVAS_HEIGHT - padY) {
        goblin.y = CANVAS_HEIGHT - padY;
    } else if (goblin.y <= grassTop + padY) {
        goblin.y = grassTop + padY;
    }
}

function testHit() {
    for (i = 0; i < numBats; ++i) {
        if (bats[i].visible) {
            var intersection = ndgmr.checkPixelCollision(goblin, bats[i], 1, true);
            if (intersection) {
                var facingRight = goblin.currentAnimation == "AttackRight";
                var facingLeft = goblin.currentAnimation == "AttackLeft";

                var facing = ((facingRight && bats[i].dirX === -1) || (facingLeft && bats[i].dirX === 1))

                if (attacking && facing) {
                    score += 2 * batSpeed;
                    ++deathCount;
                    setVisibleEnemies();
                    enemyHurt.play();
                } else {
                    affectHealth(-10);
                    playerHurt.play();
                }
                bats[i].visible = false;
                bats[i].x = bats[i].originX;
            }
        }
    }
}