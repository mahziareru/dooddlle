import { assetToCache , cachedAssets } from "./game/paint";
import { gameManager , GameObject  } from "./game/core";
import { createTile } from "./game/tile";
import { createPlayer } from "./game/player";



export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d")



async function loadImage(url) {
    const image = new Image();
    image.src = url;
    return new Promise((resolve,reject)=>{
      image.onload = () => resolve(image)
      image.onerror = (error) => reject(error)
    })
  
}

async function cacheAssets() {
  for (const key in assetToCache){
    const asset = assetToCache[key]

    cachedAssets[key] = await loadImage(asset)
  }
}


function drawBackground() {
  const player = gameManager.gameObjects.find(item => item.name === "player")
  if (player.transform.position[1] > canvas.height){
    gameManager.gameObjects = []
    ctx.drawImage(cachedAssets.mainMenu, 0, 0)
    console.log(gameManager.gameObjects);   
}else{ctx.drawImage(cachedAssets.background, 0, 0)}
  
}

await cacheAssets()




gameManager.gameObjects.push(createPlayer())



gameManager.start()




setInterval(() => {
  drawBackground()
  gameManager.tick(canvas,ctx)
} , 1000 / 70)









