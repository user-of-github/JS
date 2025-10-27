export const enum StoredDataType {
  CurrentScore = 'CurrentScore',
  BestScore = 'BestScore'
}

export class GameStorage {
  private static readonly CoinsScoreKey = 'running-ball-coins';
  private static readonly CoinsBestScoreKey = 'running-ball-coins-best';

  private static Mapping: Record<StoredDataType, string> = Object.freeze({
    [StoredDataType.CurrentScore]: GameStorage.CoinsScoreKey,
    [StoredDataType.BestScore]: GameStorage.CoinsBestScoreKey
  });

  public saveScore(type: StoredDataType, value: number): void {
    window.localStorage.setItem(GameStorage.Mapping[type], JSON.stringify(value));
  }

  public loadScore(type: StoredDataType): number {
    const str = window.localStorage.getItem(GameStorage.Mapping[type]);

    if (!str) {
      return 0;
    }

    try {
      return JSON.parse(str);
    } catch {
      return 0;
    }
  }
}
