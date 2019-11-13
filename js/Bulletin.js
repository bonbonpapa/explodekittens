class Bulletin {

    
    constructor(root) {              
        this.domElement = document.createElement("img") 
        this.domElement.src = "images/mushroom.png" 
        this.domElement.style.width = FRIEND_WIDTH
        this.domElement.style.height = FRIEND_HEIGHT
        this.domElement.style.position = "absolute" 
        this.domElement.style.zIndex = "10" 
        root.appendChild(this.domElement) 
      }

}