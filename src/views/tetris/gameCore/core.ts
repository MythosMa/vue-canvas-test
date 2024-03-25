class GameCore {
  gameFps: number = 0
  gameLoopDelta: number = 0
  isGameLooping: boolean = false
  lastGameLoopTime: number = 0

  private static instance: GameCore
  private constructor() {}

  initGame(gameFps: number = 60) {
    this.gameFps = gameFps
    this.gameLoopDelta = 1000 / gameFps
  }

  private gameLoop() {
    while (this.isGameLooping) {
      const currentTime = Date.now()
      if (!this.lastGameLoopTime || currentTime - this.lastGameLoopTime >= this.gameLoopDelta) {
      }
    }
  }

  public static getInstance(): GameCore {
    if (!GameCore.instance) {
      GameCore.instance = new GameCore()
    }
    return GameCore.instance
  }
}

export default GameCore.getInstance()
