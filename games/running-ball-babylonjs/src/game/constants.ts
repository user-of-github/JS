import { Vector3 } from '@babylonjs/core';

export const GameConstants = Object.freeze({
  SinglePlatformSize: {
    height: 0.6,
    depth: 6,
    width: 8
  },
  SingleWallSize: {
    height: 2.6666, // SinglePlatformSize.width / 3
    depth: 1,
    width: 2.591666 // SinglePlatformSize.width / 3 - 0.075
  },
  ZeroVector: new Vector3(0, 0, 0),
  StartSpeedOfMovingStraight: 6,
  MoveVectorLeft: new Vector3(-2, 0, 0),
  MoveVectorRight: new Vector3(2, 0, 0),
  TranslateVectorLeft: new Vector3(-1, 0, 0),
  TranslateVectorRight: new Vector3(1, 0, 0),
  TranslateVectorDistance: 2.6666, // SinglePlatformSize.width / 3
  BallRadius: 0.75
});
