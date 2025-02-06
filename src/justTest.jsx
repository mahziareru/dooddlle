import { gameManager } from "./game/core";
import { createTile } from "./game/tile";

export function generateNewPlatforms() {
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  const platformWidth = 59;
  const platformHight = 16;
  const requiredPlatformCount = 16;
  const minGap = 80;
  const maxGap = 120;




  let existingPlatform = gameManager.gameObjects.filter((obj)=> [
    "tile"].includes(obj.name));
  
    if (existingPlatform === 0 ) {
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

  const newTile = createTile(newX, newY);
  gameManager.gameObjects.push(newTile);
}
}



const player = {
  name: "player",
  hasCollisionTrigger: true,
  image: cachedAssets.player,
  transform: {
      position: [canvas.width / 2, canvas.height - 100], // Start position
      width: 50,
      height: 50,
  },
  velocity: { x: 0, y: 0 }, // ✅ Renamed from speedY & movingX
  update() {
      this.transform.position[1] += this.velocity.y; // Apply gravity
      this.velocity.y += 0.2; // Simulating gravity (adjust as needed)
  }
};
