var aduioQueue;
var bgm;
var playerHurt;
var enemyHurt;
aduioManifest = [
    {
        src: "rhinoceros.mp3",
        id: "bgm"
    },
    {
        src: "player_hurt.wav",
        id: "player_hurt"
    },
    {
        src: "enemy_hurt.wav",
        id: "enemy_hurt"
    }
];

function loadAudioComplete(evt) {

    //play a sound that had been preloaded
    bgm = createjs.Sound.play("bgm", {
        loop: -1
    });

    playerHurt = createjs.Sound.createInstance("player_hurt");
    enemyHurt = createjs.Sound.createInstance("enemy_hurt");


}

function loadAudioFiles() {
    //use the following to use 'mp3' if 'ogg' doesn't work on browser
    //createjs.Sound.alternateExtensions = ["mp3"];
    aduioQueue = new createjs.LoadQueue(true, audioSrc);

    //be sure to install the createjs sound plugin or your sounds won't play
    aduioQueue.installPlugin(createjs.Sound);

    aduioQueue.on("complete", loadAudioComplete, this);
    aduioQueue.loadManifest(aduioManifest);
}
loadAudioFiles();