import { gameManager, GameObject } from "./core";
import { cachedAssets } from "./paint";

export function createTile(x= 0 , y = 0){
    return {
        ...GameObject,
        name:"tile",
        hasCollisionTrigger: true,
        image:cachedAssets.tile,
        transform: {
            position: [x , y] , rotation: [0 , 0]
        },
        update(ctx , canvas){}

    }
}

export function createBrokenTile(x=0 , y=0){
    return{
        ...GameObject,
        name:"brokenTile",
        hasCollisionTrigger:true,
        image:cachedAssets.broken_tile_1,
        image_2:{
            broken_tile_2 : cachedAssets.broken_tile_2,
            broken_tile_3 : cachedAssets.broken_tile_3,
            broken_tile_4 : cachedAssets.broken_tile_4
        },
        transform: {
            position: [x , y] , rotation: [0 , 0]
        },
        isBreaking:false,
        velocity : 0,
       
          
        onCollisionEnter(obj) {
            if(obj.name === "player" && !this.isBreaking){
                this.isBreaking = true
                
                setTimeout(()=> {
                    this.image = this.image_2.broken_tile_2
                },100) 
                setTimeout(()=> {
                    this.image = this.image_2.broken_tile_3
                },200)
                setTimeout(()=> {
                    this.image = this.image_2.broken_tile_4
                },300)
                velocity = 1
                
            }
        },
        update(ctx , canvas){
            if (this.isBreaking){
                this.transform.position[1] += this.velocity
                this.velocity += 0.1
            }
            if (this.transform.position[1] > canvas.height) {
                gameManager.gameObjects = gameManager.gameObjects.filter(obj => obj !== this);
            }
        }

        

    }
}