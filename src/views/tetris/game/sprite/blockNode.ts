import { generateWarmColor } from '@/utils/tools'
import Node from '../../core/baseNode/node'
import { fabric } from 'fabric'

class BlockNode extends Node {
  private size: number[] = [0, 0] // [width, height]
  private color: string = '#ffffff'
  constructor() {
    super()
  }

  public createBlock(size: number[], nodePosition: number[]) {
    this.size = size
    this.setNodePosition(nodePosition)

    this.setFabricObject(
      new fabric.Rect({
        width: this.size[0],
        height: this.size[1],
        fill: generateWarmColor()
      })
    )
  }
}

export default BlockNode
