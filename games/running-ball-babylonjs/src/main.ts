import { Game } from './game/Game';
import type { GameHTMLElementsRefs } from './game/types';

const main = () => {
  const args: GameHTMLElementsRefs = Object.freeze({
    canvas: document.getElementById('game-canvas') as HTMLCanvasElement,
    scoreText: document.getElementById('game-score') as HTMLCanvasElement,
    userIIElements: document.getElementsByClassName('user-ui'),
    restartButtons: document.getElementsByClassName('restart-btn'),
    gameOver: {
      screen: document.getElementById('game-over-screen') as HTMLDivElement,
      currentScore: document.getElementById('game-over-score-current') as HTMLDivElement,
      bestScore: document.getElementById('game-over-score-best') as HTMLDivElement
    }
  });

  const game = new Game(args);
  game.init();
};

window.onload = main;
