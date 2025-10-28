import type { GameHTMLElementsRefs } from './types';

export class GameUiElementsManager {
  public constructor(private readonly elementsRefs: GameHTMLElementsRefs) {}

  public shrinkCanvas() {
    this.elementsRefs.canvas.width = this.elementsRefs.canvas.clientWidth;
    this.elementsRefs.canvas.height = this.elementsRefs.canvas.clientHeight;
  }

  public updateScore(score: number) {
    this.elementsRefs.scoreText.innerText = String(score);
  }

  public showGameOverScreen(currentScore: number, bestScore: number) {
    this.elementsRefs.gameOver.currentScore.innerText = `CURRENT SCORE: ${currentScore}`;
    this.elementsRefs.gameOver.bestScore.innerText = `BEST SCORE: ${bestScore}`;
    this.elementsRefs.gameOver.screen.style.display = 'flex';
  }

  public hideGameOverScreen() {
    this.elementsRefs.gameOver.screen.style.display = 'none';
    this.elementsRefs.gameOver.currentScore.innerText = `CURRENT SCORE: 0`;
    this.elementsRefs.gameOver.bestScore.innerText = `BEST SCORE: 0`;
  }

  public hideUiElements() {
    for (const element of this.elementsRefs.userIIElements) {
      (element as HTMLElement).style.display = 'none';
    }
  }

  public showUiElements() {
    for (const element of this.elementsRefs.userIIElements) {
      (element as HTMLElement).style.display = 'flex';
    }
  }
}
