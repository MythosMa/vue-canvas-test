import ShapeController from './shapeController'

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

  private pressKeyMap: Map<string, number> = new Map()
  private readonly PRESS_KEY_DOWN_COLD = 20
  private readonly PRESS_KEY_ARRAY = ['arrowdown', 'arrowleft', 'arrowright', 'z', 'x']
  private isDownFast: boolean = false
  private isRotate: boolean = false

  private isGameStart: boolean = false
  private isGameOver: boolean = false
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

    if (document) {
      document.addEventListener('keydown', (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.handleKeyboard(true, event.key)
      })

      document.addEventListener('keyup', (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.handleKeyboard(false, event.key)
      })
    }

    this.startGame()
  }

  private handleKeyboard(isDown: boolean, key: string) {
    const lowerKey = key.toLowerCase()
    if (this.PRESS_KEY_ARRAY.includes(lowerKey)) {
      if (isDown) {
        if (!this.pressKeyMap.has(lowerKey)) {
          if (lowerKey === 'arrowleft' && this.pressKeyMap.has('arrowright')) {
            return
          }
          if (lowerKey === 'arrowright' && this.pressKeyMap.has('arrowleft')) {
            return
          }
          this.pressKeyMap.set(lowerKey, 1)
        }
      } else {
        if (lowerKey === 'z' || lowerKey === 'x') {
          this.isRotate = false
        }
        if (lowerKey === 'arrowdown') {
          this.isDownFast = false
        }
        if (this.pressKeyMap.has(lowerKey)) {
          this.pressKeyMap.delete(lowerKey)
        }
      }
    }
  }

  public getRowCount(): number {
    return this.rowCount
  }

  public getColumnCount(): number {
    return this.columnCount
  }

  public startGame() {
    this.isGameStart = true
    if (this.currentBlock) {
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
        this.refreshBoardBlocksInfo(false)
        if (this.pressKeyMap.size) {
          this.pressKeyMapUpdate(this.pressKeyMap)
        }
        if (this.isDownFast || this.moveColdown <= 0) {
          this.moveColdown = this.maxMoveColdown
          if (this.checkBlockCanMoveDown()) {
            this.currentBlock.moveDown()
          } else {
            if (!this.checkDownGameOver()) {
              this.refreshBoardBlocksInfo(true)
              this.checkLineCleanUp()
              this.showNextBlock()
              this.checkShowGameOver()
            }
            this.isDownFast = false
            this.pressKeyMap.delete('arrowdown')
            return
          }
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

  private checkBlockCanRotateMove(blocks: number[][]) {
    let isFix = false
    do {
      isFix = false
      let isFixMoveRight = false
      for (let i = 0; i < blocks.length; i++) {
        const blockInfo = blocks[i]
        if (blockInfo[0] < 0) {
          isFixMoveRight = true
          isFix = true
          break
        }
      }
      if (isFixMoveRight) {
        for (let i = 0; i < blocks.length; i++) {
          blocks[i][0]++
        }
      }

      let isFixMoveLeft = false
      for (let i = 0; i < blocks.length; i++) {
        const blockInfo = blocks[i]
        if (blockInfo[0] >= this.columnCount) {
          isFixMoveLeft = true
          isFix = true
          break
        }
      }
      if (isFixMoveLeft) {
        for (let i = 0; i < blocks.length; i++) {
          blocks[i][0]--
        }
      }
    } while (isFix)
  }

  private fixBlockAfterRotate() {
    if (this.currentBlock) {
      let isFix = false
      do {
        isFix = false
        const blockPosition = this.currentBlock.getBlockPosition()
        let isFixMoveRight = false
        for (let i = 0; i < blockPosition.length; i++) {
          const blockInfo = blockPosition[i]
          if (blockInfo[0] < 0) {
            isFixMoveRight = true
            isFix = true
            break
          }
        }
        if (isFixMoveRight) {
          this.currentBlock.moveRight()
        }

        let isFixMoveLeft = false
        for (let i = 0; i < blockPosition.length; i++) {
          const blockInfo = blockPosition[i]
          if (blockInfo[0] >= this.columnCount) {
            isFixMoveLeft = true
            isFix = true
            break
          }
        }
        if (isFixMoveLeft) {
          this.currentBlock.moveLeft()
        }
      } while (isFix)
    }
  }

  private checkBlockCanRotateLeft(): boolean {
    if (this.currentBlock) {
      const currentBlockRotateLeftPosition = this.currentBlock.getPreRotateLeftPosition()
      this.checkBlockCanRotateMove(currentBlockRotateLeftPosition)
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
      this.checkBlockCanRotateMove(currentBlockRotateRightPosition)
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

  private pressKeyMapUpdate(pressKeyMap: Map<string, number>) {
    for (const [key, value] of pressKeyMap.entries()) {
      pressKeyMap.set(key, value + 1)
      if (1 < value && value < this.PRESS_KEY_DOWN_COLD) {
        return
      }
      switch (key) {
        case 'arrowleft':
          console.log('left', value)
          this.handleBlockMoveLeft()
          break
        case 'arrowright':
          this.handleBlockMoveRight()
          break
        case 'arrowdown':
          this.handleBlockMoveDown()
          break
        case 'z':
          this.handleBlockRotateLeft()
          break
        case 'x':
          this.handleBlockRotateRight()
          break
      }
    }
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
      this.fixBlockAfterRotate()
      this.isRotate = true
    }
  }

  private handleBlockRotateRight() {
    if (!this.isRotate && this.currentBlock && this.checkBlockCanRotateRight()) {
      this.currentBlock.rotateRight()
      this.fixBlockAfterRotate()
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

  private checkDownGameOver() {
    if (this.currentBlock) {
      const currentBlockTopPosition = this.currentBlock.getBlockTopPosition()
      for (let i = 0; i < currentBlockTopPosition.length; i++) {
        const topBlockInfo = currentBlockTopPosition[i]
        if (topBlockInfo[1] < 0) {
          this.gameOver()
          return true
        }
      }
    }
    return false
  }

  private checkShowGameOver() {
    if (this.currentBlock) {
      const currentBlockBottomPosition = this.currentBlock.getBlockBottomPosition()
      for (let i = 0; i < currentBlockBottomPosition.length; i++) {
        const bottomBlockInfo = currentBlockBottomPosition[i]
        if (bottomBlockInfo[1] >= 0 && bottomBlockInfo[0]) {
          if (this.boardBlockInfo[bottomBlockInfo[1]][bottomBlockInfo[0]] !== '') {
            this.gameOver()
            return true
          }
        }
      }
    }
    return false
  }

  private gameOver() {
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        this.boardBlockInfo[i][j] === ''
      }
    }
    this.isGameStart = false
    this.isGameOver = true
  }

  public getIsGameOver() {
    return this.isGameOver
  }

  public getNextBlock() {
    return this.nextBlock
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
