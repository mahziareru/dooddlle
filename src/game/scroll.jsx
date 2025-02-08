import { gameManager } from "./core";
import { cachedAssets } from "./paint";
import { createBrokenTile, createMovingTile, createTile } from "./tile";


const canvas = document.getElementById("game")


export function updateGameWorld() {
    const canvas = document.getElementById("game")
    const scrollThreshold = (canvas.height / 4) + 10 ;
    const player = gameManager.gameObjects.find(item => item.name === "player")
    
    
    if (player.transform.position[1] < scrollThreshold) {
        const scrollSpeed = scrollThreshold - player.transform.position[1];

     
        player.transform.position[1] = scrollThreshold;

       
        gameManager.gameObjects.forEach((obj) => {
            obj.transform.position[1] += scrollSpeed; 
        });

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
    const breakingTileChance = 0.3
    const movingTileChance = 0.2

    gameManager.gameObjects = gameManager.gameObjects.filter(
        (obj) => obj.transform.position[1] < canvasHeight
    );
  
  
  
  
    let existingPlatform = gameManager.gameObjects.filter((obj)=> [
      "tile" , "movingTile" , "brokenTile"].includes(obj.name));
    
      if (existingPlatform.length === 0 ) {

        gameManager.gameObjects.push(createTile(100,500));
        console.log(gameManager.gameObjects);
        
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
    let validPosition = false;
    let newX , newY;
    const gap = minGap + Math.random() * (maxGap - minGap);

    for(let i = 0 ; i < requiredPlatformCount ; i++){
        newY = highestY - gap;
        newX = Math.random() * (canvasWidth - platformWidth);

        const overlaps = existingPlatform.some(platform =>
            Math.abs(newX - platform.transform.position[0]) < platformWidth * 0.8 &&
            Math.abs(newY - platform.transform.position[1]) < minGap * 0.8
        );

        if (!overlaps) {
            validPosition = true;
            break;
        }
    }
    if (!validPosition) continue;

    
        
    
    let newTile;
    if(Math.random() < movingTileChance){
        newTile = createMovingTile(newX , newY)
    }else if(Math.random() < breakingTileChance){
        newTile = createBrokenTile(newX,newY)
    }else {
        newTile = createTile(newX , newY)
    }
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





