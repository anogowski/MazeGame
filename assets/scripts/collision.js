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