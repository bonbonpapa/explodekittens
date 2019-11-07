class Enemy { 
        update(timeDiff) { 
                // let rate = 1.01;
                // this.accele(rate); 
                this.y = this.y + timeDiff * this.speed 
                this.x = this.x + (timeDiff * this.speed) * this.diag
                this.domElement.style.top = this.y + "px" 
                this.domElement.style.left = this.x + "px"
                if (this.y > GAME_HEIGHT || this.x < 0 || this.x > GAME_WIDTH) { 
                        this.root.removeChild(this.domElement) 
                        this.destroyed = true 
                } 
        }
        accele(rate) {
                this.speed = this.speed * rate;

        }
        
        constructor(theRoot, enemySpot) { 
                this.root = theRoot 
                this.spot = enemySpot 
                this.x = enemySpot * ENEMY_WIDTH 
                this.y = -ENEMY_HEIGHT 
                this.destroyed = false 
                this.domElement = document.createElement("img") 
                this.domElement.src = "images/enemy.png" 
                this.domElement.style.position = "absolute" 
                this.domElement.style.left = this.x + "px" 
                this.domElement.style.top = this.y + "px" 
                this.domElement.style.zIndex = 5 
                theRoot.appendChild(this.domElement) 
                this.speed = Math.random() / 2 + 0.25 
                let items = [-1, 0 , 1];
                this.diag = items[Math.floor(Math.random()*items.length)];
        } 
} 