import { Game } from './Game';
import type { GameHTMLElementsRefs } from './types';

function main() {
  const args: GameHTMLElementsRefs = {
    canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
    scoreText: document.getElementById('game-score') as HTMLCanvasElement,
    gameOver: {
      screen: document.getElementById('game-over-screen') as HTMLDivElement,
      currentScore: document.getElementById('game-over-score-current') as HTMLDivElement,
      bestScore: document.getElementById('game-over-score-best') as HTMLDivElement
    }
  };

  const game = new Game(args);
  game.init();
}

main();
