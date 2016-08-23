var numVisibleEnemies = 3;
var currentVisibleEnemies = 0;
var enemiesToBeVisible = [];
var batSpeed = 1;
var batMaxSpeed = 6;
var scoreToIncrease = 25;
var deathCount = 0;
var deathMod = 5;

function setVisibleEnemies() {
    if (deathCount % deathMod === 0) {
        ++batSpeed;
        ++numVisibleEnemies;
    }
    if (numVisibleEnemies > numBats) {
        numVisibleEnemies = numBats;
    }
}

function checkVisibleEnemies() {
    currentVisibleEnemies = 0;
    for (i = 0; i < numBats; ++i) {
        if (bats[i].visible) {
            ++currentVisibleEnemies;
        }
    }
}

function spawnEnemies() {
    while (currentVisibleEnemies < numVisibleEnemies) {
        temp = getRandomInt(0, numBats - 1);
        if (!(bats[temp].visible)) {

            enemiesToBeVisible.push(temp);
            ++currentVisibleEnemies;
        }
    }

    while (enemiesToBeVisible.length > 0) {
        temp = enemiesToBeVisible.pop();
        bats[temp].visible = true;
    }
}

function moveBats() {
    if (batSpeed > batMaxSpeed) {
        batSpeed = batMaxSpeed;
    }

    for (i = 0; i < numBats; ++i) {
        if (bats[i].visible) {
            bats[i].x += bats[i].dirX * batSpeed;
            if (bats[i].dirX === -1 && bats[i].x < bats[i].boundX) {
                bats[i].x = bats[i].originX;
            } else if (bats[i].dirX === 1 && bats[i].x > bats[i].boundX) {
                bats[i].x = bats[i].originX;
            }
        }
    }
}