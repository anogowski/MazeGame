 var block;
 var levelArray = [];
 var grid = [];
 var spriteImageSize = 32;
 var playerImgSizeX = 32;
 var playerImgSizeY = 36;
 var playerSprite;
 manifest = [
     {
         src: "sprites.png",
         id: "sprites"
    },
     {
         src: "ninja_m.png",
         id: "ninja_m"
    }
];


 function loadFiles() {
     queue = new createjs.LoadQueue(true, imgSrc); //files are stored in 'images' directory
     queue.on("complete", loadComplete, this); //when loading is done run 'loadComplete()'
     queue.loadManifest(manifest); //load files listed in 'manifest'
 }


 function loadComplete(evt) {
     loadSprites();
     gridSetup();
     boardSetup();
     loadPlayerSprite();
     stage.update();

 }

 loadFiles();


 function loadSprites() {
     var data = new createjs.SpriteSheet({
         images: [queue.getResult("sprites")],
         frames: {
             width: spriteImageSize,
             height: spriteImageSize
         },
         animations: {
             "Castle": {
                 frames: [0]
             },
             "Wood": {
                 frames: [1]
             },
             "Grass": {
                 frames: [2]
             },
             "Dirt": {
                 frames: [3]
             },
             "Water": {
                 frames: [4]
             }
         }
     });

     block = new createjs.Sprite(data);
     block.gotoAndStop("Castle");

 }

 function loadPlayerSprite() {
     var data = new createjs.SpriteSheet({
         images: [queue.getResult("ninja_m")],
         frames: {
             width: playerImgSizeX,
             height: playerImgSizeY
         },
         animations: {
             "WalkUp": {
                 frames: [0, 1, 2],
                 speed: 0.1
             },
             "WalkRight": {
                 frames: [3, 4, 5],
                 speed: 0.1
             },
             "WalkDown": {
                 frames: [6, 7, 8],
                 speed: 0.1
             },
             "WalkLeft": {
                 frames: [9, 10, 11],
                 speed: 0.1
             }
         }
     });

     playerSprite = new createjs.Sprite(data);
     playerSprite.x = 32;
     playerSprite.y = 32;
     playerSprite.scaleY = 0.88
     playerSprite.gotoAndPlay("WalkUp");
     stage.addChild(playerSprite);
 }

 function gridSetup() {
     var numBorder = CANVAS_SIZE / spriteImageSize;

     for (i = 0; i < numBorder; ++i) {

         for (j = 0; j < numBorder; ++j) {
             x = i * 32;
             y = j * 32;

             grid.push({
                 x: x,
                 y: y
             });
         }
     }
 }

 function boardSetup() {

     var numBorder = CANVAS_SIZE / spriteImageSize;

     for (i = 0; i < grid.length; ++i) {
         x = grid[i].x;
         y = grid[i].y;

         block.x = x;
         block.y = y;

         if (x == 0 || x == CANVAS_SIZE - spriteImageSize || y == 0 || y == CANVAS_SIZE - spriteImageSize) {
             block.gotoAndStop("Castle");
         } else {
             block.gotoAndStop("Grass");
         }
         levelArray.push(block.clone());
     }

     for (i = 0; i < levelArray.length; ++i) {
         stage.addChild(levelArray[i]);
     }
 }