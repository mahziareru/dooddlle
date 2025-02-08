import { gameManager, GameObject } from "./core";
import { cachedAssets } from "./paint";
import {   handleOverFlow, updateGameWorld } from "./scroll";

const canvas = document.getElementById("game")




export function createPlayer(x = 0 , y = 0){
    return{
        ...GameObject,
        name:"player",
        image:cachedAssets.player,
        transform:{position:[100,100] , rotation:[0,0] , width:0 , height:0},
        hasCollisionTrigger: true,
        gravity: 0.3,
        velocity: { x: 0, y: 0 },
        characterFacing: "left",
        movingKey: "",
        
        onCollisionEnter(obj) {
            if (obj.name === "tile" || obj.name === "movingTile" || obj.name === "brokenTile") this.velocity.y = -10
           
          },

        start(){
            document.addEventListener("keydown" , (e) => {
                if(e.key === "d" || e.key === "AroowRight"){
                    this.movingKey = e.key 
                    this.velocity.x = 1
                    this.characterFacing = "right"
                }else if (e.key === "a" || e.key === "AroowLeft"){
                    this.movingKey = e.key
                    this.velocity.x = -1
                    this.characterFacing = "left"
                }
            })

            document.addEventListener("keyup" , (e) => {
                if(e.key === this.movingKey){
                    this.velocity.x = 0
                    this.movingKey = ""
                }
            })

        }  ,
       
        update(ctx, canvas) {
            if (this.velocity.y < 0) {
              if (this.characterFacing === "left") {
                this.image = cachedAssets.playerJumpLeft
              } else {
                this.image = cachedAssets.playerJumpRight
              }
            } else {
              if (this.characterFacing === "left") {
                this.image = cachedAssets.playerLeft
              } else {
                this.image = cachedAssets.playerRight
              }
            }
            
    
            
            this.velocity.y = Math.min(this.velocity.y + this.gravity, 12)
            this.transform.position[0] += this.velocity.x * 3
            this.transform.position[1] += this.velocity.y
            updateGameWorld()
            handleOverFlow()
      
            
            
            
          },
    }
    

}