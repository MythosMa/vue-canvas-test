import ShapeController from './shapeController'
import hotkeys from 'hotkeys-js'

class GameController {
  private static instance: GameController
  private boardBlockInfo: string[][] = [] // [Y][X]
  private rowCount: number = 20
  private columnCount: number = 10
  private currentBlock: ShapeController | null = null
  private nextBlock: ShapeController | null = null
  private level: number = 1
  private score: number = 0
  private moveColdown: number = 0
  private maxMoveColdown: number = 0
  private defaultMoveColdown: number = 1

  private pressKey: string = ''
  private isDownFast: boolean = false
  private isRotate: boolean = false

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
    hotkeys('left, right, down, z, x', { keyup: true }, (event, handler) => {
      if (event.type === 'keyup') {
        this.pressKey = ''
        this.isDownFast = false
        this.isRotate = false
      } else {
        this.pressKey = handler.key
      }
    })
    this.startGame()
  }

  public getRowCount(): number {
    return this.rowCount
  }

  public getColumnCount(): number {
    return this.columnCount
  }

  public startGame() {
    if (this.currentBlock) {
      this.isGameStart = true
      this.currentBlock.startMove(Math.floor(this.columnCount / 2))
      this.refreshBoardBlocksInfo(true)
    }
  }

  public refreshBoardBlocksInfo(isShow: boolean) {
    if (this.currentBlock) {
      const currentBlockPosition = this.currentBlock.getBlockPosition()
      for (let i = 0; i < currentBlockPosition.length; i++) {
        const showBlock = currentBlockPosition[i]
        if (showBlock[0] >= 0 && showBlock[1] >= 0) {
          this.boardBlockInfo[showBlock[1]][showBlock[0]] = isShow
            ? this.currentBlock.getBlockColor()
            : ''
        }
      }
    }
  }

  public update(deltaTime: number) {
    if (this.isGameStart) {
      if (this.currentBlock) {
        if (this.pressKey) {
          this.pressKeyUpdate(this.pressKey)
          this.pressKey = ''
        }
        if (this.isDownFast || this.moveColdown <= 0) {
          if (this.checkBlockCanMoveDown()) {
            this.refreshBoardBlocksInfo(false)
            this.currentBlock.moveDown()
            this.refreshBoardBlocksInfo(true)
          } else {
            this.checkLineCleanUp()
            this.showNextBlock()
            this.isDownFast = false
          }
          this.moveColdown = this.maxMoveColdown
        } else {
          this.moveColdown -= deltaTime
        }
        this.refreshBoardBlocksInfo(true)
      }
    }
  }

  public getBoardBlockInfo(): string[][] {
    return this.boardBlockInfo
  }

  private checkBlockCanMoveDown(): boolean {
    if (this.currentBlock) {
      const currentBlockBottomPosition = this.currentBlock.getBlockBottomPosition()
      for (let i = 0; i < currentBlockBottomPosition.length; i++) {
        const bottomBlockInfo = currentBlockBottomPosition[i]
        if (bottomBlockInfo[1] >= this.rowCount - 1) {
          return false
        } else if (this.boardBlockInfo[bottomBlockInfo[1] + 1][bottomBlockInfo[0]] !== '') {
          return false
        }
      }

      return true
    }
    return false
  }

  private checkBlockCanMoveLeft(): boolean {
    if (this.currentBlock) {
      const currentBlockLeftPosition = this.currentBlock.getBlockLeftPosition()
      for (let i = 0; i < currentBlockLeftPosition.length; i++) {
        const leftBlockInfo = currentBlockLeftPosition[i]
        if (leftBlockInfo[0] <= 0) {
          return false
        } else if (
          leftBlockInfo[1] >= 0 &&
          this.boardBlockInfo[leftBlockInfo[1]][leftBlockInfo[0] - 1] !== ''
        ) {
          return false
        }
      }
      return true
    }
    return false
  }

  private checkBlockCanMoveRight(): boolean {
    if (this.currentBlock) {
      const currentBlockRightPosition = this.currentBlock.getBlockRightPosition()
      for (let i = 0; i < currentBlockRightPosition.length; i++) {
        const rightBlockInfo = currentBlockRightPosition[i]
        if (rightBlockInfo[0] >= this.columnCount - 1) {
          return false
        } else if (
          rightBlockInfo[1] >= 0 &&
          this.boardBlockInfo[rightBlockInfo[1]][rightBlockInfo[0] + 1] !== ''
        ) {
          return false
        }
      }
      return true
    }
    return false
  }

  private checkBlockCanRotateLeft(): boolean {
    if (this.currentBlock) {
      const currentBlockRotateLeftPosition = this.currentBlock.getPreRotateLeftPosition()
      for (let i = 0; i < currentBlockRotateLeftPosition.length; i++) {
        const rotateLeftBlockInfo = currentBlockRotateLeftPosition[i]
        if (rotateLeftBlockInfo[0] >= 0 && rotateLeftBlockInfo[1] >= 0) {
          if (this.boardBlockInfo[rotateLeftBlockInfo[1]][rotateLeftBlockInfo[0]] !== '') {
            return false
          }
        }
      }
      return true
    }
    return false
  }

  private checkBlockCanRotateRight(): boolean {
    if (this.currentBlock) {
      const currentBlockRotateRightPosition = this.currentBlock.getPreRotateRightPosition()
      for (let i = 0; i < currentBlockRotateRightPosition.length; i++) {
        const rotateRightBlockInfo = currentBlockRotateRightPosition[i]
        if (rotateRightBlockInfo[0] >= 0 && rotateRightBlockInfo[1] >= 0) {
          if (this.boardBlockInfo[rotateRightBlockInfo[1]][rotateRightBlockInfo[0]] !== '') {
            return false
          }
        }
      }
      return true
    }
    return false
  }

  private showNextBlock() {
    if (this.currentBlock && this.nextBlock) {
      this.currentBlock = this.nextBlock
      this.nextBlock = new ShapeController()
      this.currentBlock.startMove(Math.floor(this.columnCount / 2))
    }
  }

  private pressKeyUpdate(pressKey: string) {
    this.refreshBoardBlocksInfo(false)
    switch (pressKey) {
      case 'left':
        this.handleBlockMoveLeft()
        break
      case 'right':
        this.handleBlockMoveRight()
        break
      case 'down':
        this.handleBlockMoveDown()
        break
      case 'z':
        this.handleBlockRotateLeft()
        break
      case 'x':
        this.handleBlockRotateRight()
        break
    }
    this.refreshBoardBlocksInfo(true)
  }

  private handleBlockMoveLeft() {
    if (this.currentBlock && this.checkBlockCanMoveLeft()) {
      this.currentBlock.moveLeft()
    }
  }

  private handleBlockMoveRight() {
    if (this.currentBlock && this.checkBlockCanMoveRight()) {
      this.currentBlock.moveRight()
    }
  }

  private handleBlockMoveDown() {
    this.isDownFast = true
  }

  private handleBlockRotateLeft() {
    if (!this.isRotate && this.currentBlock && this.checkBlockCanRotateLeft()) {
      this.currentBlock.rotateLeft()
      this.isRotate = true
    }
  }

  private handleBlockRotateRight() {
    if (!this.isRotate && this.currentBlock && this.checkBlockCanRotateRight()) {
      this.currentBlock.rotateRight()
      this.isRotate = true
    }
  }

  private checkLineCleanUp() {
    for (let i = this.rowCount - 1; i >= 0; i--) {
      let isCleanUp = true
      for (let j = 0; j < this.columnCount; j++) {
        if (this.boardBlockInfo[i][j] === '') {
          isCleanUp = false
          break
        }
      }
      if (isCleanUp) {
        for (let k = i - 1; k >= 0; k--) {
          this.boardBlockInfo[k + 1] = this.boardBlockInfo[k]
        }
        this.boardBlockInfo[0] = Array(this.columnCount).fill('')
      }
    }
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
