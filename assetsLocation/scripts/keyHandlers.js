
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var KEYCODE_J = 74;

// Direction is based on KEYCODE down
var xDirection = 0;
var yDirection = 0;

function handleKeyDown(evt) {
    if(!evt){ var evt = window.event; }  //browser compatibility
    switch(evt.keyCode) {
        case KEYCODE_LEFT:  xDirection = -3;    playerCharacter.gotoAndPlay("walkLeft");    return false;
        case KEYCODE_RIGHT: xDirection = 3;     playerCharacter.gotoAndPlay("walkRight");   return false;
        case KEYCODE_UP:    yDirection = -3; if(xDirection === 0) { playerCharacter.gotoAndPlay("walkRight"); }  return false;
        case KEYCODE_DOWN:  yDirection = 3;  if(xDirection === 0) { playerCharacter.gotoAndPlay("walkLeft");  }   return false;
    
    }
    console.log(evt.keyCode+" down");
}

function handleKeyUp(evt) {
    if(!evt){ var evt = window.event; }  //browser compatibility
    switch(evt.keyCode) {
        case KEYCODE_LEFT:  if(yDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   xDirection = 0; break;
        case KEYCODE_RIGHT: if(yDirection ==0){ playerCharacter.gotoAndPlay("stand");    }  xDirection = 0; break;
        case KEYCODE_UP:    if(xDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   yDirection = 0; break;
        case KEYCODE_DOWN:  if(xDirection ==0){ playerCharacter.gotoAndPlay("stand");    }   yDirection = 0; break;
        case KEYCODE_J: IS_EASYMODE = !IS_EASYMODE; break;
    }
   
}
 
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;