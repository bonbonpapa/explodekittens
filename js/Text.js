class Text { 
    constructor(root, xPos, yPos) { 
        let div = document.createElement("div") 
        div.style.position = "absolute" 
        div.style.left = xPos 
        div.style.top = yPos 

        div.style.color = "white" 
        div.style.font = "bold 30px Impact" 
        div.style.zIndex = 2000
        div.style.width = "100px"
        div.style.height = "100px"
        
        // div.innerText = "score"
        root.appendChild(div) 
        this.domElement = div 

    } 
    update(txt) { 
        this.domElement.innerText = txt 
    } 
} 