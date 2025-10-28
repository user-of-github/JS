export interface Size3D {
  width: number;
  height: number;
  depth: number;
}

export interface GameHTMLElementsRefs {
  canvas: HTMLCanvasElement;
  scoreText: HTMLElement;
  userIIElements: HTMLCollection;
  restartButtons: HTMLCollection;
  gameOver: {
    screen: HTMLDivElement;
    currentScore: HTMLSpanElement;
    bestScore: HTMLSpanElement;
  };
}

export const enum GameStatus {
  Playing = 'Playing',
  GameOver = 'GameOver'
}
