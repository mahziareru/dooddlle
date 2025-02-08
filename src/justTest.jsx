export function generateNewPlatforms() {
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  const platformWidth = 50;
  const platformHeight = 10;
  const requiredPlatformCount = 16;

  const minGap = 80;
  const maxGap = 120;

  const breakableTileChance = 0.2;
  const movingTileChance = 0.15;

  let existingPlatforms = gameManager.gameObjects.filter((obj) =>
      ["tile", "breakableTile", "movingTile"].includes(obj.name)
  );

  if (existingPlatforms.length === 0) {
      let startY = canvasHeight - 50; 

      for (let i = 0; i < requiredPlatformCount; i++) {
          let x = Math.random() * (canvasWidth - platformWidth);
          let y = startY - i * (minGap + (maxGap - minGap) * 0.5);

          gameManager.gameObjects.push(createNormalTile(x, y));
      }

      return;
  }

  const highestY = Math.min(...existingPlatforms.map(obj => obj.transform.position[1]), canvasHeight);

  while (existingPlatforms.length < requiredPlatformCount) {
      let validPosition = false;
      let newX, newY;

      for (let i = 0; i < 10; i++) {
          newY = highestY - (minGap + Math.random() * (maxGap - minGap));
          newX = Math.random() * (canvasWidth - platformWidth);

          const overlaps = existingPlatforms.some(platform =>
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
      if (Math.random() < movingTileChance) {
          newTile = createMovingTile(newX, newY);
      } else if (Math.random() < breakableTileChance) {
          newTile = createBreakableTile(newX, newY);
      } else {
          newTile = createNormalTile(newX, newY);
      }

      gameManager.gameObjects.push(newTile);
      existingPlatforms.push(newTile);
  }
}
