import { gameManager, GameObject } from "./core";
import { cachedAssets } from "./paint";
const canvas1 = document.getElementById("game")

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
        velocity: { x: 0, y: 0 },
       
          
        onCollisionEnter(obj) {
            console.log("fucking ayay")
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
                
            }
        },
        update(ctx , canvas){
            if (this.isBreaking){
                this.transform.position[1] += this.velocity.y
                this.velocity.y += 0.1
            }
            if (this.transform.position[1] > canvas1.height) {
                gameManager.gameObjects = gameManager.gameObjects.filter(obj => obj !== this);
            }
        }

        

    }
}


export function createMovingTile(x=0 , y=0){
    let speed = 1
    return{
        ...GameObject,
        name:"movingTile",
        hasCollisionTrigger: true,
        image:cachedAssets.movingTile,
        pos:"right",
        velocity:{ x: 0 , y: 0},
        transform: {
            position: [x , y] , rotation: [0 , 0]
        },
        onCollisionEnter(obj){
            if(obj.name === "player"){
                console.log("i did it");
                
            }
        },
        
        update(ctx , canvas){
            
            if(this.transform.position[0] > canvas1.width){
                this.pos = "left"
            }else if (this.transform.position[0] < 1  && this.transform.position[0] < canvas1.width ){
                this.pos = "right"
            }
            
           
            
            
            if(this.pos === "right"){
                this.transform.position[0] += speed
                
            }
            if(this.pos === "left"){
                this.transform.position[0] -= speed
                
                
              }

        }

    }
}