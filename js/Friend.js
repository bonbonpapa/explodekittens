class Friend extends Enemy {
    update(timeDiff){
        super.update(timeDiff);
        if(this.destroyed && this.domElement.parentNode === this.root)
        this.root.removeChild(this.domElement);
    }

    constructor(theRoot, spot, speedModifier) {
        super(theRoot, spot, speedModifier);

        this.domElement.src = "images/mushroom.png";
        this.spot = spot; 
        this.x = spot * FRIEND_WIDTH + MAX_ENEMIES * ENEMY_WIDTH;
        this.y = -FRIEND_HEIGHT;
       
      }  

}