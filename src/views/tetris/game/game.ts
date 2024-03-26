import TestLayout from './layout/testLayout'
import TestScene from './scene/testScene'

class Game {
  private static instance: Game
  private constructor() {}

  private gameScene: TestScene | null = null
  initGame(canvasId: string) {
    this.gameScene = new TestScene({ gameFps: 60, canvasId, width: 400, height: 400 })
    this.gameScene.addChild(new TestLayout())
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game()
    }
    return Game.instance
  }
}

export default Game.getInstance()
