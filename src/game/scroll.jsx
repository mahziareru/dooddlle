import { gameManager } from "./core";
import { cachedAssets } from "./paint";
import { createBrokenTile, createMovingTile, createTile } from "./tile";


const canvas = document.getElementById("game")


export function updateGameWorld() {
    const canvas = document.getElementById("game")
    const scrollThreshold = (canvas.height / 4) + 10 ;
    const player = gameManager.gameObjects.find(item => item.name === "player")
    
    
    // Check if player is above the scroll threshold
    if (player.transform.position[1] < scrollThreshold) {
        const scrollSpeed = scrollThreshold - player.transform.position[1];

        // Move player to the scroll threshold
        player.transform.position[1] = scrollThreshold;

        // Scroll all platforms, enemies, and background elements down
        gameManager.gameObjects.forEach((obj) => {
            obj.transform.position[1] += scrollSpeed; // Move objects downward
        });

        // Optionally, generate new platforms if needed
        generateNewPlatforms()
        
    }
    
}

export function generateNewPlatforms() {
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    const platformWidth = 59;
    const platformHight = 16;
    const requiredPlatformCount = 20;
    const minGap = 40;
    const maxGap = 70;


    gameManager.gameObjects = gameManager.gameObjects.filter(
        (obj) => obj.transform.position[1] < canvasHeight
    );
  
  
  
  
    let existingPlatform = gameManager.gameObjects.filter((obj)=> [
      "tile" , "movingTile"].includes(obj.name));
    
      if (existingPlatform.length === 0 ) {

        let startY = canvasHeight - 50
        for(let i = 0  ; i < requiredPlatformCount ; i++ ){
          let x  = Math.random() * (canvasWidth - platformWidth)
          let y  = Math.random() * (canvasHeight - platformHight)
  
          gameManager.gameObjects.push(createTile(x,y));
        }
        return;
      }
  
const highestY = Math.min(...existingPlatform.map(obj => obj.transform.position[1]), canvasHeight);
while (existingPlatform.length < requiredPlatformCount) {
    console.log(gameManager.gameObjects);
    
  
    // Calculate the y position for the new tile
    const gap = minGap + Math.random() * (maxGap - minGap);
    const newY = highestY - gap;
    console.log(newY);
    
        
  
    // Randomize x position but ensure it's fully within canvas bounds
    const newX = Math.random() * (canvasWidth - 50); // Assuming 50 is the tile width
  
    const newTile = createMovingTile(newX, newY);
    gameManager.gameObjects.push(newTile);
    existingPlatform.push(newTile);
  }
  }
  


export function handleOverFlow(){
    const player = gameManager.gameObjects.find(item => item.name === "player")
    
    if(player.transform.position[0] > canvas.width){
        player.transform.position[0] = -1
    }else if (player.transform.position[0] < 0.1){
        player.transform.position[0] = canvas.width - 1
    }else if (player.transform.position[1] > canvas.height){

    }
}





