import { Game } from './Game';

async function main() {
  const canvasRef = document.getElementById('game-canvas') as HTMLCanvasElement;
  const scoreTextRef = document.getElementById('game-score') as HTMLCanvasElement;

  new Game({ canvasRef, scoreTextRef });
}

main();
