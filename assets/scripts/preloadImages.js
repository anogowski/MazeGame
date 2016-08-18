 var block;
 var levelArray = [];
 var grid = [];
 var imageSize = 32;
 manifest = [
     {
         src: "sprites.png",
         id: "sprites"
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
     stage.update();

 }

 loadFiles();


 function loadSprites() {
     var data = new createjs.SpriteSheet({
         images: [queue.getResult("sprites")],
         frames: {
             width: imageSize,
             height: imageSize
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

 function gridSetup() {
     var numBorder = CANVAS_SIZE / imageSize;

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

     var numBorder = CANVAS_SIZE / imageSize;

     for (i = 0; i < grid.length; ++i) {
         x = grid[i].x;
         y = grid[i].y;

         block.x = x;
         block.y = y;

         if (x == 0 || x == CANVAS_SIZE - imageSize || y == 0 || y == CANVAS_SIZE - imageSize) {
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