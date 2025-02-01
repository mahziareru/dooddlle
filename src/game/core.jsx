const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

export const GameObject = {
  transform: {
    position: [0, 0],
    rotation: [0, 0],
    width: 0,
    height: 0,
  },
  image: null,
  hasColligionTrigger: false,
  onCollisionEnter(gameObject) {},
  start() {},
  update(canvas, ctx) {},
};

function drawImage(image, x, y) {
  ctx.drawImage(image, x, y);
}

export const gameManager = {
  gameObjects: [],

  start() {
    this.gameObjects.forEach((gameObject) => gameObject.start());
    this.gameObjects.forEach((gameObject) => this.paint(gameObject));
  },
  tick(canvas, ctx) {
    this.gameObjects.forEach((gameObjects) => {
      if (gameObjects.image) {
        gameObjects.transform.width = gameObjects.image.width;
        gameObjects.transform.height = gameObjects.image.height;
      }
      gameObjects.update(canvas, ctx);
    });

    this.gameObjects
      .filter((item) => item.hasCollisionTrigger)
      .forEach((gameObject) => {
        this.gameObjects.forEach((go) => {
          if (go === gameObject) return;

          if (this.checkCollision(gameObject, go)) {
            if (typeof gameObject.onCollisionEnter === "function") {
              gameObject.onCollisionEnter(go);
            }
          }
        });
      });

    this.gameObjects.forEach((gameObject) => this.paint(gameObject));
  },

  paint(gameObject) {
    if (gameObject.image) {
      drawImage(
        gameObject.image,
        gameObject.transform.position[0],
        gameObject.transform.position[1]
      );
    }
  },

  checkCollision(obj1, obj2, bufferX = 10, bufferY = 0) { 
    const rect1 = {
      x: obj1.transform.position[0] + bufferX,
      y: obj1.transform.position[1] + bufferY,
      width: obj1.transform.width - 2 * bufferX,
      height: obj1.transform.height - 2 * bufferY,
    };

    const rect2 = {
      x: obj2.transform.position[0] + bufferX,
      y: obj2.transform.position[1] + bufferY,
      width: obj2.transform.width - 2 * bufferX,
      height: obj2.transform.height - 2 * bufferY,
    };

    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  },
};
