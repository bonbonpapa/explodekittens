class Engine {
  gameLoop = () => {
       if (this.lastFrame === undefined) 
       {
          this.lastFrame = new Date().getTime();
          this.firstFrame = this.lastFrame;
       }
       let timeDiff = new Date().getTime() - this.lastFrame;
       this.lastFrame = new Date().getTime();
       this.enemies.forEach(enemy => {
         enemy.update(timeDiff);
       });
       // to add the count of the destroyed enemies
       this.score += this.enemies.filter(enemy => { return enemy.destroyed}).length;

       this.enemies = this.enemies.filter(enemy => {
         return !enemy.destroyed;
       });

       // to increase the MAX_ENEMIES every 10 secs and maximum to 5

       let timeInterval = new Date().getTime() - this.firstFrame;
       if (timeInterval >= 10000 && MAX_ENEMIES < 5)
       {
         MAX_ENEMIES ++;
         this.firstFrame = new Date().getTime();
       }
       
       while (this.enemies.length < MAX_ENEMIES) {
         let spot = nextEnemySpot(this.enemies);
         this.enemies.push(new Enemy(this.root, spot));
       }
       if (this.isPlayerDead()) {
         window.alert("Game over");
         return;
       }
       
       this.scoreText.update("" + this.score);
       setTimeout(this.gameLoop, 20);
  
  };
  isPlayerDead = () => {
    for (let i = 0; i < this.enemies.length ; i++) 
    {
      if (this.player.x >= this.enemies[i].x && this.player.x <= this.enemies[i].x + ENEMY_WIDTH && this.player.y > this.enemies[i].y && this.player.y < this.enemies[i].y + ENEMY_HEIGHT)
      return true;
    }
    return false;
  };
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    console.log("before", Text)
    this.scoreText = new Text(this.root, (GAME_WIDTH - 100) + "px", "10px");   
    console.log("after")
    this.score = 0;
    this.lost = 0;
    this.enemies = [];
    addBackground(this.root);
  }
}
