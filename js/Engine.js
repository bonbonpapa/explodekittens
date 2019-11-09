class Engine {
  gameLoop = () => {
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }
    let timeDiff = new Date().getTime() - this.lastFrame;
    this.lastFrame = new Date().getTime();
    this.enemies.forEach(enemy => {
      enemy.update(timeDiff);
    });

    this.speedModifier = Math.min(3, timeDiff * 0.00001) + this.speedModifier;

    this.score += timeDiff;

    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });

    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot, this.speedModifier));
    }
    if (this.isPlayerDead()) {
      //  window.alert("Game over");
      let msgGame = new Text(
        this.root,
        GAME_WIDTH / 2 - 100 + "px",
        GAME_HEIGHT / 2 - 50 + "px"
      );
      msgGame.update("Game Over");
      return;
    }

    // can update here the scoreText.style. x location when the scores
    if(this.score > 10000)
    {
      this.scoreText.domElement.style.left = (GAME_WIDTH - 80) + "px";
    }

    this.scoreText.update("" + this.score);

    setTimeout(this.gameLoop, 20);
  };
  isPlayerDead = () => {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      if (
        enemy.x + ENEMY_WIDTH >= this.player.x &&
        enemy.x <= this.player.x + PLAYER_WIDTH &&
        this.player.y + PLAYER_HEIGHT >= enemy.y &&
        this.player.y <= enemy.y + ENEMY_HEIGHT
      ) {
        return true;
      }
    }
    return false;
  };
  constructor(theRoot) {
    this.root = theRoot;
    this.player = new Player(this.root);
    this.scoreText = new Text(this.root, GAME_WIDTH - 60 + "px", "10px");
    this.score = 0;
    this.enemies = [];
    this.speedModifier = 1;
    addBackground(this.root);
  }
}
