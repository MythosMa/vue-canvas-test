class GameCore {
  gameCanvas: fabric.Group | null

  private static instance: GameCore
  private constructor() {
    this.gameCanvas = null
  }

  initGame(canvas: fabric.Group) {
    this.gameCanvas = canvas
  }

  public static getInstance(): GameCore {
    if (!GameCore.instance) {
      GameCore.instance = new GameCore()
    }
    return GameCore.instance
  }
}

export default GameCore.getInstance()
