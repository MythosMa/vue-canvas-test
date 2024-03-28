import Node from '../../core/baseNode/node'
import { fabric } from 'fabric'

import GameBoardLayout from './gameBoardLayout'
import InfoBoardLayout from './infoBoardLayout'

class GameLayout extends Node {
  private gameBoardLayout: GameBoardLayout | null = null
  private infoBoardLayout: InfoBoardLayout | null = null
  constructor() {
    super()
    this.init()
  }

  public init() {
    this.gameBoardLayout = new GameBoardLayout({ gameBoardWidth: 200, gameBoardHeight: 400 })
    this.gameBoardLayout.setNodePosition([10, 50])
    this.gameBoardLayout.setFabricObject(
      new fabric.Rect({
        width: 200,
        height: 400,
        fill: 'transparent',
        stroke: '#fff',
        strokeWidth: 1
      })
    )
    this.addChild(this.gameBoardLayout)

    this.infoBoardLayout = new InfoBoardLayout()
    this.infoBoardLayout.setNodePosition([210, 50])
    this.infoBoardLayout.setFabricObject(
      new fabric.Rect({
        width: 100,
        height: 400,
        fill: 'transparent',
        stroke: '#fff',
        strokeWidth: 1
      })
    )

    this.addChild(this.infoBoardLayout)
  }

  public update() {}
}

export default GameLayout
