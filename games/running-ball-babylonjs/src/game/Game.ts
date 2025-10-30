import { Vector3, type BoundingBox } from '@babylonjs/core';

import { GameStatus, type GameHTMLElementsRefs } from './types';
import { GameStorageService, StoredDataType } from './game-services/storage.service';
import { GameUiElementsService } from './game-services/ui-elements.service';
import { GameConstants } from './constants';
import { GameSceneService } from './game-services/scene.service';
import { isMobileDevice } from './utils';

export class Game {
  private readonly movingVectorStraight = new Vector3(0, 0, GameConstants.StartSpeedOfMovingStraight);
  private readonly isMobile = isMobileDevice();
  private readonly sceneService: GameSceneService;
  private readonly storageService: GameStorageService;
  private readonly uiElementsService: GameUiElementsService;

  private coinScore: number = 0;
  private gameStatus = GameStatus.Playing;

  public constructor(private readonly elementsRefs: GameHTMLElementsRefs) {
    this.sceneService = new GameSceneService(this.elementsRefs.canvas);
    this.uiElementsService = new GameUiElementsService(this.elementsRefs);
    this.storageService = new GameStorageService();
  }

  public init(): void {
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.initControls();

    this.sceneService.createGameObjects();

    this.coinScore = this.storageService.loadScore(StoredDataType.CurrentScore);
    this.uiElementsService.updateScore(this.coinScore);

    this.gameStatus = GameStatus.Playing;

    this.sceneService.setBeforeRenderCallback(this.onBeforeRenderCallback);
    this.sceneService.runRenderLoop();
  }

  private readonly onBeforeRenderCallback = () => {
    this.checkIfGameOver();
    this.checkCoinEarned();
  };

  private initControls() {
    for (const element of this.elementsRefs.restartButtons) {
      (element as HTMLButtonElement).onclick = this.restart.bind(this);
    }

    if (isMobileDevice()) {
        this.initControlsMobile();
    } else {
        this.initControlsDesktop();
    }
  }

  private initControlsDesktop() {
    window.addEventListener('keydown', event => {
      if (this.gameStatus === GameStatus.GameOver && event.key === 'Enter') {
        this.restart();
        return;
      }

      if (this.sceneService.ball.position.y > 2) return;
        switch (true) {
          case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
            this.pushBall(GameConstants.MoveVectorLeft);
            break;
          case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
            this.pushBall(GameConstants.MoveVectorRight);
            break;
        }
    });

    window.addEventListener('keyup', event => {
      if (this.gameStatus !== GameStatus.Playing) return;

      if (this.sceneService.ball.position.y > 2) return;

      switch (true) {
        case event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a':
          this.stopBallMovingAside();
          break;
        case event.key === 'ArrowRight' || event.key.toLocaleLowerCase() === 'd':
          this.stopBallMovingAside();
          break;
      }

      this.speedUpBall();
    });
  }

  private initControlsMobile() {
    this.elementsRefs.canvas.addEventListener('touchstart', event => {
      if (this.gameStatus !== GameStatus.Playing) return;
      if (!(event.changedTouches[0].screenY > 0.3 * window.screen.height)) return;
      if (this.sceneService.ball.position.y > 2) return;

      this.stopBallMovingAside();
    });

    this.elementsRefs.canvas.addEventListener('touchend', event => {
      if (this.gameStatus !== GameStatus.Playing) return;
      if (this.sceneService.ball.position.y > 2) return;
      if (!(event.changedTouches[0].screenY > 0.3 * window.screen.height)) return;

      const x = event.changedTouches[0].clientX;
      const screenWidth = this.elementsRefs.canvas.clientWidth;

      if (x < screenWidth / 2) {
        this.sceneService.ball.translate(GameConstants.TranslateVectorLeft, GameConstants.TranslateVectorDistance);
      } else {
        this.sceneService.ball.translate(GameConstants.TranslateVectorRight, GameConstants.TranslateVectorDistance);
      }

      this.speedUpBall();
    });
  }

  private checkIfGameOver(): void {
    const ball = this.sceneService.ball;
    const walls = this.sceneService.walls;

    if (ball.getAbsolutePosition().y <= 0) {
      this.gameOver();
    }

    const check = (spherePos: Vector3, box: BoundingBox): boolean => {
      const min = box.minimumWorld;
      const max = box.maximumWorld;

      const closestX = Math.max(min.x, Math.min(spherePos.x, max.x));
      const closestY = Math.max(min.y, Math.min(spherePos.y, max.y));
      const closestZ = Math.max(min.z, Math.min(spherePos.z, max.z));

      const distance = Vector3.Distance(spherePos, new Vector3(closestX, closestY, closestZ));

      return distance < GameConstants.BallRadius;
    };

    for (let i = 0; i < walls.length; ++i) {
      if (walls[i] && ball) {
        const ballPos = ball.position;
        const wallBounds = walls[i].getBoundingInfo().boundingBox;

        if (check(ballPos, wallBounds)) {
          walls[i].material = this.sceneService.wallTouchedMaterial;
          this.gameOver();
          break;
        }
      }
    }
  }

  private pushBall(impuls: Vector3): void {
    this.sceneService.ball.physicsImpostor?.applyImpulse(impuls, this.sceneService.ball.getAbsolutePosition());
  }

  private stopBallMovingAside(): void {
    this.sceneService.ball.physicsImpostor?.setLinearVelocity(this.movingVectorStraight);
    this.sceneService.ball.physicsImpostor?.setAngularVelocity(GameConstants.ZeroVector);
  }

  private speedUpBall(): void {
    if (this.isMobile) {
        this.movingVectorStraight.z += this.movingVectorStraight.z * 0.03;
    } else {
      this.movingVectorStraight.z += this.movingVectorStraight.z * 0.015;
    }
  }

  private onWindowResize() {
    this.uiElementsService.shrinkCanvas();
    this.sceneService.resizeEngine();
  }

  private checkCoinEarned(): void {
    const coins = this.sceneService.coins;

    for (let i = 0; i < coins.length; ++i) {
      if (this.sceneService.ball.intersectsMesh(coins[i], true)) {
        ++this.coinScore;
        this.uiElementsService.updateScore(this.coinScore);
        this.sceneService.removeCoinByIndex(i);
        this.storageService.saveScore(StoredDataType.CurrentScore, this.coinScore);
        break;
      }
    }
  }

  private gameOver(): void {
    this.gameStatus = GameStatus.GameOver;

    const bestScore = this.storageService.loadScore(StoredDataType.BestScore);

    if (this.coinScore > bestScore) {
      this.storageService.saveScore(StoredDataType.BestScore, this.coinScore);
    }

    this.storageService.saveScore(StoredDataType.CurrentScore, 0);

    this.uiElementsService.hideUiElements();
    this.uiElementsService.showGameOverScreen(this.coinScore, this.storageService.loadScore(StoredDataType.BestScore));
  }

  private restart() {
    this.gameStatus = GameStatus.Playing;
    this.movingVectorStraight.z = GameConstants.StartSpeedOfMovingStraight;

    this.coinScore = 0;
    this.uiElementsService.updateScore(this.coinScore);
    this.storageService.saveScore(StoredDataType.CurrentScore, 0);

    this.sceneService.resetGameObjects();
    this.sceneService.createGameObjects();
    this.uiElementsService.hideGameOverScreen();
    this.uiElementsService.showUiElements();
  }
}
