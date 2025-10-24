import { Game } from './Game';


async function main() {
  const appCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    
  const app = new Game(appCanvas);

  await app.init();
}


main();
