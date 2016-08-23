var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_W = 87;
var KEYCODE_A = 65;
var KEYCODE_S = 83;
var KEYCODE_D = 68;
var KEYCODE_SPACE = 32;
var KEYCODE_H = 72;
var KEYCODE_J = 74;

var leftDown = false;
var upDown = false;
var rightDown = false;
var downDown = false;
var wDown = false;
var aDown = false;
var sDown = false;
var dDown = false;
var spaceDown = false;
var hDown = false;
var jDown = false;

function handleKeyDown(evt) {
    if (!evt) {
        var evt = window.event;
    }
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        if (!leftDown && !attacking) {
            goblin.gotoAndPlay("AttackLeft");
            leftDown = !leftDown;
        }
        return false;
    case KEYCODE_RIGHT:
        if (!rightDown && !attacking) {
            goblin.gotoAndPlay("AttackRight");
            rightDown = !rightDown;
        }
        return false;
    case KEYCODE_UP:
        if (!upDown) {

            upDown = !upDown;
        }
        return false;
    case KEYCODE_DOWN:
        if (!downDown) {

            downDown = !downDown;
        }
        return false;
    case KEYCODE_W:
        if (!wDown) {

            wDown = !wDown;
        }
        return false;
    case KEYCODE_A:
        if (!aDown) {

            aDown = !aDown;
        }
        return false;
    case KEYCODE_S:
        if (!sDown) {

            sDown = !sDown;
        }
        return false;
    case KEYCODE_D:
        if (!dDown) {

            dDown = !dDown;
        }
        return false;
    case KEYCODE_SPACE:
        if (!spaceDown) {

            spaceDown = !spaceDown;
        }
        return false;
    case KEYCODE_J:
        if (!jDown) {
            resetHealth();
            --batMaxSpeed;
            if (batMaxSpeed <= 0) {
                batMaxSpeed = 1;
            }
            jDown = !jDown;
        }
        return false;
    case KEYCODE_H:
        if (!hDown) {
            ++batMaxSpeed;
            ++batSpeed;
            if (batMaxSpeed > 6) {
                batMaxSpeed = 6;
            }
            hDown = !hDown;
        }
        return false;
    }
}

function handleKeyUp(evt) {
    if (!evt) {
        var evt = window.event;
    }
    switch (evt.keyCode) {
    case KEYCODE_LEFT:
        if (leftDown) {
            leftDown = !leftDown;
        }
        break;
    case KEYCODE_RIGHT:
        if (rightDown) {
            rightDown = !rightDown;
        }
        break;
    case KEYCODE_UP:
        if (upDown) {

            upDown = !upDown;
        }
        break;
    case KEYCODE_DOWN:
        if (downDown) {

            downDown = !downDown;
        }
        break;
    case KEYCODE_W:
        if (wDown) {

            wDown = !wDown;
        }
        break;
    case KEYCODE_A:
        if (aDown) {

            aDown = !aDown;
        }
        break;
    case KEYCODE_S:
        if (sDown) {

            sDown = !sDown;
        }
        break;
    case KEYCODE_D:
        if (dDown) {

            dDown = !dDown;
        }
        break;
    case KEYCODE_SPACE:
        if (spaceDown) {

            spaceDown = !spaceDown;
        }
        break;
    case KEYCODE_J:
        if (jDown) {
            jDown = !jDown;
        }
        break;
    case KEYCODE_H:
        if (hDown) {
            hDown = !hDown;
        }
        break;
    }

}



document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;