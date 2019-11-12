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

    this.friends.forEach(friend => {
      friend.update(timeDiff);
    });

    this.speedModifier = Math.min(2, timeDiff * 0.00001) + this.speedModifier;

    this.score += timeDiff;

    this.enemies = this.enemies.filter(enemy => {
      return !enemy.destroyed;
    });

    this.friends = this.friends.filter(friend => {
      return !friend.destroyed;
    });


    while (this.enemies.length < MAX_ENEMIES) {
      let spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot, this.speedModifier));
    }

    while (this.friends.length < MAX_FRIENDS) {
      let spot = nextFriendSpot(this.friends);
      this.friends.push(new Friend(this.root, spot, this.speedModifier));
    }

    this.isFriendEaten();
    

    if (this.isPlayerDead()) {
      let msgGame = new Text(
        this.root,
        GAME_WIDTH / 2 - 100 + "px",
        GAME_HEIGHT / 2 - 50 + "px"
      );
      msgGame.domElement.style.width = "200px"
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
  isFriendEaten = () => {
    for (let i = 0; i < this.friends.length; i++) {
      const friend = this.friends[i];
      if(
        friend.x + FRIEND_WIDTH >= this.player.x &&
        friend.x <= this.player.x + PLAYER_WIDTH &&
        this.player.y + PLAYER_HEIGHT >= friend.y &&
        this.player.y <= friend.y + FRIEND_HEIGHT
      ) {
        this.friends[i].destroyed = true;
      }
    }
  }
  constructor(theRoot) {
    this.root = theRoot;
    this.root.style.position = "relative"

    this.player = new Player(this.root);
    this.scoreText = new Text(this.root, GAME_WIDTH - 60 + "px", "10px");
    this.score = 0;
    this.enemies = [];
    this.friends = [];
    this.speedModifier = 1;
    // addBackground(this.root);
  }
}
