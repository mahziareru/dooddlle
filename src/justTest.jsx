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

this.gameObjects
  .filter((item) => item.hasColligionTrigger)
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
