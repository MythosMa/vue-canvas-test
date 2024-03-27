import ShapeController from './shapeController'

class GameController {
  private static instance: GameController
  private boardBlockInfo: string[][] = []
  private rowCount: number = 20
  private columnCount: number = 10
  private currentBlock: ShapeController = null
  private nextBlock: ShapeController = null
  private level: number = 1
  private score: number = 0
  private moveColdown: number = 0
  private maxMoveColdown: number = 0
  private defaultMoveColdown: number = 1
  private isGameStart: boolean = false
  constructor() {}

  public init() {
    for (let i = 0; i < this.rowCount; i++) {
      this.boardBlockInfo[i] = []
      for (let j = 0; j < this.columnCount; j++) {
        this.boardBlockInfo[i][j] = ''
      }
    }
    this.maxMoveColdown = this.defaultMoveColdown / this.level
    this.moveColdown = this.maxMoveColdown
    this.currentBlock = new ShapeController()
    this.nextBlock = new ShapeController()
    this.startGame()
  }

  public getRowCount(): number {
    return this.rowCount
  }

  public getColumnCount(): number {
    return this.columnCount
  }

  public startGame() {
    this.isGameStart = true
    this.currentBlock.startMove(Math.floor(this.columnCount / 2))
  }

  public refreshBoardBlocksInfo(isShow: boolean) {
    const currentBlockInfo = this.currentBlock.getBlockInfo()
    for (let i = 0; i < currentBlockInfo.length; i++) {
      const showBlock = currentBlockInfo[i]
      if (showBlock[0] >= 0 && showBlock[1] >= 0) {
        this.boardBlockInfo[showBlock[1]][showBlock[0]] = isShow
          ? this.currentBlock.getBlockColor()
          : ''
      }
    }
  }

  public update(deltaTime: number) {
    if (this.isGameStart) {
      if (this.moveColdown < 0) {
        this.refreshBoardBlocksInfo(false)
        this.currentBlock.moveDown()
        this.refreshBoardBlocksInfo(true)
        this.moveColdown = this.maxMoveColdown
      } else {
        this.moveColdown -= deltaTime
      }
    }
  }

  public getBoardBlockInfo(): string[][] {
    return this.boardBlockInfo
  }

  public static getInstance(): GameController {
    if (!GameController.instance) {
      GameController.instance = new GameController()
      GameController.instance.init()
    }
    return GameController.instance
  }
}

export default GameController.getInstance()
