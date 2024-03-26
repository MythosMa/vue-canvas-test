import { fabric } from 'fabric'
import Node from '../../core/baseNode/node'

class TestLayout extends Node {
  private testRect1: Node | null = null
  private testRect2: Node | null = null
  constructor() {
    super()
    this.init()
  }

  public init() {
    this.testRect1 = new Node()
    this.testRect1.setFabricObject(
      new fabric.Rect({
        fill: 'red',
        width: 100,
        height: 100
      })
    )
    this.testRect1.setNodePosition([10, 10])
    this.addChild(this.testRect1)

    this.testRect2 = new Node()
    this.testRect2.setFabricObject(
      new fabric.Rect({
        fill: 'blue',
        width: 100,
        height: 100
      })
    )
    this.testRect2.setNodePosition([20, 20])
    this.addChild(this.testRect2)
  }

  public update() {
    if (this.testRect1 && this.testRect2) {
      this.testRect1.setNodePosition([
        this.testRect1.getNodePosition()[0] + 1,
        this.testRect1.getNodePosition()[1] + 1
      ])

      this.testRect2.setNodePosition([
        this.testRect2.getNodePosition()[0] + 1,
        this.testRect2.getNodePosition()[1] + 1
      ])

      if (this.testRect1.getZIndex() > this.testRect2.getZIndex()) {
        this.testRect2.setZIndex(this.testRect1.getZIndex() + 1)
      } else {
        this.testRect1.setZIndex(this.testRect2.getZIndex() + 1)
      }
    }
  }
}

export default TestLayout
