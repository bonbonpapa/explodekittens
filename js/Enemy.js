class Enemy {
  update(timeDiff) {
    this.y = this.y + timeDiff * this.speed;
    this.x = this.x + timeDiff * this.speed * this.diag;

    if (this.x < 0 || this.x + ENEMY_WIDTH > GAME_WIDTH) {
      this.diag *= -1;
      this.x < 0 ? 0 : GAME_WIDTH - ENEMY_WIDTH;
    }

    this.domElement.style.top = this.y + "px";
    this.domElement.style.left = this.x + "px";
    if (this.y > GAME_HEIGHT) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
  constructor(theRoot, enemySpot, speedModifier) {
    this.root = theRoot;
    this.spot = enemySpot;
    this.x = enemySpot * ENEMY_WIDTH;
    this.y = -ENEMY_HEIGHT;
    this.destroyed = false;
    this.domElement = document.createElement("img");
    this.domElement.src = "images/king-boo.png";
    this.domElement.style.height = ENEMY_HEIGHT;
    this.domElement.style.width = ENEMY_WIDTH;
    this.domElement.style.position = "absolute";
    this.domElement.style.left = this.x + "px";
    this.domElement.style.top = this.y + "px";
    this.domElement.style.zIndex = 5;
    theRoot.appendChild(this.domElement);

    this.speed = (Math.random() < 0.5 ? 0.1 : 0.15) * speedModifier;

    this.diag = Math.random() < 0.5 ? -0.5 : 0.5;
  }
}
