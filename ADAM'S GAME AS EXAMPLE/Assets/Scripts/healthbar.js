var heathbarContainer
var healthbar;
var health = 100;
var MAX_HEALTH = 100;

function healthbarSetup() {
    heathbarContainer = new createjs.Container();
    boundry = new createjs.Shape();
    boundry.graphics.beginStroke("#000").drawRect(0, 0, 150, 20);

    healthbar = new createjs.Shape();
    healthbar.graphics.beginFill("#F00").drawRect(0, 0, 150, 20);

    heathbarContainer.addChild(boundry, healthbar);
    heathbarContainer.x = 5;
    heathbarContainer.y = 5;
    stage.addChild(heathbarContainer);
    heathbarContainer.visible = false;
}

function resetHealth() {
    health = MAX_HEALTH;
    healthbar.scaleX = health / MAX_HEALTH;
}

function affectHealth(amount) {
    health += amount;
    healthbar.scaleX = health / MAX_HEALTH;
}