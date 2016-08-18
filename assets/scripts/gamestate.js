var Setup = "Setup";
var Title = "Title";
var Menu = "Menu";
var Play = "Play";
var GameOver = "GameOver";
var Instuctions = "Instructions";
var container;
var levelText;
var scoreText;
var score = 0;
var GameState = Setup;
var speed = 4;

function SwitchState() {
    switch (GameState) {
    case Setup:

        GameState = Play;
        break;
    case Title:
        break;

    case Menu:

        break;

    case Play:
        runGameTimer();
        if (wDown || upDown) {
            playerSprite.y -= speed;
        } else if (sDown || downDown) {
            playerSprite.y += speed;
        }

        if (aDown || leftDown) {
            playerSprite.x -= speed;
        } else if (dDown || rightDown) {
            playerSprite.x += speed;
        }

        bounds();
        break;

    case GameOver:

        break;
    }
}


function MainMenu() {


    GameState = Title;
}

function TitleEnd() {

    GameState = Menu;
}

function InstructionsStart() {

}

function GameOverStart() {

    GameState = GameOver;
}