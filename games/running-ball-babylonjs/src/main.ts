import { Game } from './Game';


async function main() {
  const appCanvas = document.getElementById('game-canvas') as HTMLCanvasElement;

  new Game(appCanvas);
}


main();
