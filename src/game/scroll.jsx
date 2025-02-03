import { gameManager } from "./core";
import { cachedAssets } from "./paint";
import { createBrokenTile, createTile } from "./tile";


const canvas = document.getElementById("game")


export function updateGameWorld() {
    const canvas = document.getElementById("game")
    const scrollThreshold = (canvas.height / 4) + 90 ;
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

    // Remove platforms that are off-screen
    gameManager.gameObjects = gameManager.gameObjects.filter(
        (obj) => obj.transform.position[1] < canvasHeight
    );

    const requiredPlatformCount = 27; // Minimum number of platforms
    const verticalGapRange = [80, 120]; // Gap range between tiles

    // Get the highest platform's Y position
    const highestY = Math.min(
        ...gameManager.gameObjects
            .filter((obj) => obj.name === "tile")
            .map((obj) => obj.transform.position[1]),
        canvasHeight
    );

    // Add new platforms
    while (
        gameManager.gameObjects.filter((obj) => obj.name === "tile").length <
        requiredPlatformCount
    ) {
        // Calculate the y position for the new tile
        const newY =
            highestY - Math.random() * (verticalGapRange[1] - verticalGapRange[0]) -
            verticalGapRange[0];
            

        // Randomize x position but ensure it's fully within canvas bounds
        const newX = Math.random() * (canvasWidth - 50); // Assuming 50 is the tile width

        const newTile = createTile(newX, newY);
        const newBrokenTile = createBrokenTile(newX , newY)
        gameManager.gameObjects.push(newTile);
        gameManager.gameObjects.push(newBrokenTile)
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





