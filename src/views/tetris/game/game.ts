import GameScene from './scene/gameScene'
import GameController from './controller/controller'
class Game {
  private static instance: Game
  private constructor() {}
  private gameScene: GameScene | null = null

  initGame(
    canvasId: string,
    {
      width = 400,
      height = 400,
      gameFps = 60,
      isShowFps = false
    }: { width?: number; height?: number; gameFps?: number; isShowFps?: boolean } = {}
  ) {
    GameController.init()
    this.gameScene = new GameScene({ canvasId, width, height, gameFps, isShowFps })
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game()
    }
    return Game.instance
  }
}

export default Game.getInstance()
