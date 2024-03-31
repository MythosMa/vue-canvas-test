import Node from '../../core/baseNode/node'
import { fabric } from 'fabric'
import GameController from '../controller/controller'

class InfoBoardLayout extends Node {
  private singleBlockSize = 10
  private nextBlockInfoNodeSize = 80
  private nextBlockInfoNode: Node | null = null
  private nextBlockInfoBoard: Node[][] = []
  private columnCount: number = 0
  private rowCount: number = 0
  private scoreText: Node | null = null
  private lineText: Node | null = null
  private levelText: Node | null = null
  constructor() {
    super()
    this.init()
  }

  public init() {
    const nextText = new Node()
    nextText.setNodePosition([10, 10])
    nextText.setFabricObject(
      new fabric.Text('Next', {
        fill: 'white',
        fontSize: 24
      })
    )
    nextText.setZIndex(9999)
    this.addChild(nextText)

    this.nextBlockInfoNode = new Node()
    this.nextBlockInfoNode.setNodePosition([10, 50])
    this.nextBlockInfoNode.setFabricObject(
      new fabric.Rect({
        width: this.nextBlockInfoNodeSize,
        height: this.nextBlockInfoNodeSize,
        fill: 'transparent',
        stroke: 'white',
        strokeWidth: 1
      })
    )
    this.addChild(this.nextBlockInfoNode)

    this.columnCount = this.nextBlockInfoNodeSize / this.singleBlockSize
    this.rowCount = this.nextBlockInfoNodeSize / this.singleBlockSize
    for (let i = 0; i < this.rowCount; i++) {
      const row: Node[] = []
      for (let j = 0; j < this.columnCount; j++) {
        const block = new Node()
        block.setNodePosition([j * this.singleBlockSize, i * this.singleBlockSize])
        console.log('node position:', block.getNodePosition())
        block.setFabricObject(
          new fabric.Rect({
            width: this.singleBlockSize,
            height: this.singleBlockSize,
            fill: 'transparent'
          })
        )
        row.push(block)
        this.nextBlockInfoNode.addChild(block)
      }
      this.nextBlockInfoBoard.push(row)
    }

    const scoreTextLabel = new Node()
    scoreTextLabel.setNodePosition([10, 150])
    scoreTextLabel.setFabricObject(
      new fabric.Text('Score', {
        fill: 'white',
        fontSize: 24
      })
    )
    scoreTextLabel.setZIndex(9999)
    this.addChild(scoreTextLabel)

    this.scoreText = new Node()
    this.scoreText.setNodePosition([10, 190])
    this.scoreText.setFabricObject(
      new fabric.Text('0', {
        fill: 'white',
        fontSize: 16
      })
    )
    this.addChild(this.scoreText)

    const lineTextLabel = new Node()
    lineTextLabel.setNodePosition([10, 220])
    lineTextLabel.setFabricObject(
      new fabric.Text('Line', {
        fill: 'white',
        fontSize: 24
      })
    )
    lineTextLabel.setZIndex(9999)
    this.addChild(lineTextLabel)

    this.lineText = new Node()
    this.lineText.setNodePosition([10, 260])
    this.lineText.setFabricObject(
      new fabric.Text('0', {
        fill: 'white',
        fontSize: 16
      })
    )
    this.addChild(this.lineText)

    const levelTextLabel = new Node()
    levelTextLabel.setNodePosition([10, 290])
    levelTextLabel.setFabricObject(
      new fabric.Text('Level', {
        fill: 'white',
        fontSize: 24
      })
    )
    levelTextLabel.setZIndex(9999)
    this.addChild(levelTextLabel)

    this.levelText = new Node()
    this.levelText.setNodePosition([10, 330])
    this.levelText.setFabricObject(
      new fabric.Text('1', {
        fill: 'white',
        fontSize: 16
      })
    )
    this.addChild(this.levelText)
  }

  public update() {
    if (this.nextBlockInfoNode) {
      this.nextBlockInfoBoard.forEach((row) => {
        row.forEach((item) => {
          item.setDisabled(true)
        })
      })
      const nextBlock = GameController.getNextBlock()
      if (nextBlock) {
        const positions = nextBlock.getBlockPosition()
        const startX = Math.floor(this.columnCount / 2)
        const startY = Math.floor(this.rowCount / 2)
        for (let i = 0; i < positions.length; i++) {
          const position = positions[i]
          const x = position[0] + startX
          const y = position[1] + startY
          this.nextBlockInfoBoard[y][x].setDisabled(false)
          this.nextBlockInfoBoard[y][x].getFabricObject()?.set('fill', nextBlock.getBlockColor())
        }
      }
    }
    if (this.scoreText) {
      const fab = this.scoreText.getFabricObject() as fabric.Text
      if (fab) {
        fab.text = GameController.getScore().toString()
      }
    }

    if (this.lineText) {
      const fab = this.lineText.getFabricObject() as fabric.Text
      if (fab) {
        fab.text = GameController.getCleanLine().toString()
      }
    }

    if (this.levelText) {
      const fab = this.levelText.getFabricObject() as fabric.Text
      if (fab) {
        fab.text = GameController.getLevel().toString()
      }
    }
  }
}

export default InfoBoardLayout
