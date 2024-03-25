class GameScene {
  blocks: number[][] = []
  gameSceneGroup: fabric.Group | null = null
  constructor() {}

  public init(xCount: number, yCount: number, gameSceneGroup: fabric.Group) {
    // 初始化地图
    this.gameSceneGroup = gameSceneGroup
    this.blocks = []
    for (let i = 0; i < yCount; i++) {
      this.blocks.push(new Array(xCount).fill(0))
    }
  }
}

export default GameScene
