import { fabric } from 'fabric'
import Node from '../../core/baseNode/node'

class TestLayout extends Node {
  constructor() {
    super()
    this.init()
  }

  public init() {
    const testRect = new Node()
    testRect.setFabricObject(
      new fabric.Rect({
        fill: 'red',
        width: 100,
        height: 100
      })
    )
    testRect.setNodePosition([10, 10])
    this.addChild(testRect)
  }
}

export default TestLayout
