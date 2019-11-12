let gameEngine = new Engine(document.getElementById("app")) 
let keydownHandler = event => { 
    if (event.code === "ArrowLeft") { 
        gameEngine.player.moveLeft() 
    } 
    if (event.code === "ArrowRight") { 
        gameEngine.player.moveRight() 
    } 
    if (event.code === "ArrowUp") {
        gameEngine.player.moveUp()
    }
    if (event.code === "ArrowDown") {
        gameEngine.player.moveDown()
    }
} 
document.addEventListener("keydown", keydownHandler) 
gameEngine.gameLoop() 

const intervalId = setInterval(() => {
    if(MAX_ENEMIES < 5) {
         MAX_ENEMIES++;
     GAME_WIDTH = Math.max(500, (MAX_ENEMIES + 2) * ENEMY_WIDTH);
    // document.getElementById('bg').remove();
    // document.getElementById('whiteBox').remove();
    // addBackground(gameEngine.root);
    }
    else clearInterval(intervalId)    
}, 10000);