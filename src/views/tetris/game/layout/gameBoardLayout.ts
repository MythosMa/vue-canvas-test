import Node from '../../core/baseNode/node'
import BlockNode from '../sprite/blockNode'
import GameController from '../controller/controller'

class GameBoardLayout extends Node {
  private blocks: BlockNode[][] = []
  private singleBlockSize: number[] = [0, 0]
  private columnCount: number = 0
  private rowCount: number = 0
  constructor({
    gameBoardWidth,
    gameBoardHeight
  }: {
    gameBoardWidth: number
    gameBoardHeight: number
  }) {
    super()
    this.rowCount = GameController.getRowCount()
    this.columnCount = GameController.getColumnCount()
    this.singleBlockSize = [gameBoardWidth / this.columnCount, gameBoardHeight / this.rowCount]
    for (let i = 0; i < this.rowCount; i++) {
      this.blocks[i] = []
      for (let j = 0; j < this.columnCount; j++) {
        const blockNode = new BlockNode()
        blockNode.createBlock(this.singleBlockSize, [
          this.singleBlockSize[0] * j,
          this.singleBlockSize[1] * i
        ])
        blockNode.setDisabled(true)
        this.blocks[i][j] = blockNode
        this.addChild(blockNode)
      }
    }
  }

  public update(deltaTime: number) {
    const boardBlockInfo = GameController.getBoardBlockInfo()
    for (let i = 0; i < boardBlockInfo.length; i++) {
      const lineInfo = boardBlockInfo[i]
      for (let j = 0; j < lineInfo.length; j++) {
        if (lineInfo[j]) {
          console.log('lineInfo[j]', lineInfo[j])
          const fabricObject = this.blocks[i][j].getFabricObject()
          if (fabricObject) {
            fabricObject.set('fill', lineInfo[j])
          }
        }
        this.blocks[i][j].setDisabled(lineInfo[j] === '')
      }
    }
  }
}

export default GameBoardLayout
