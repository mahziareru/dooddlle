import { GameObject } from "./core";
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