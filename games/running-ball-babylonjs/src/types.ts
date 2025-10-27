export interface Size3D {
  width: number;
  height: number;
  depth: number;
}

export interface GameHTMLElementsRefs {
  canvas: HTMLCanvasElement;
  scoreText: HTMLElement;
  gameOver: {
    screen: HTMLDivElement;
    currentScore: HTMLSpanElement;
    bestScore: HTMLSpanElement;
  }
}

export const enum GameStatus {
  Playing = 'Playing',
  GameOver = 'GameOver'
}
