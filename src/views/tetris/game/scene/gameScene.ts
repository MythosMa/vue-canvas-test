import Scene from '../../core/baseNode/scene'
import GameLayout from '../layout/gameLayout'
import GameController from '../controller/controller'
class GameScene extends Scene {
  private gameLayout: GameLayout | null = null
  constructor({
    gameFps,
    canvasId,
    width,
    height,
    isShowFps
  }: {
    gameFps: number
    canvasId: string
    width: number
    height: number
    isShowFps: boolean
  }) {
    super({ gameFps, canvasId, width, height, isShowFps })
    this.init()
  }

  protected init() {
    this.gameLayout = new GameLayout()
    this.addChild(this.gameLayout)
  }

  public update(deltaTime: number) {
    GameController.update(deltaTime)
  }
}

export default GameScene
