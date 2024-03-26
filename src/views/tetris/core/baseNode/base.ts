class GameNodeBase {
  private nodeId: string = ''
  private nodePosition: number[] = [0, 0]
  private zIndex: number = 0
  private children: GameNodeBase[] = []
  private fabricObject: fabric.Object | null = null

  constructor(fabricObject: fabric.Object | null = null) {
    this.nodeId = Math.random() + ''
    this.fabricObject = fabricObject
  }

  public updateLoop(detlaTime: number) {
    this.children.forEach((child) => {
      child.updateLoop(detlaTime)
    })
    this.update(detlaTime)
  }

  public update(detlaTime: number) {}

  public getNodeId() {
    return this.nodeId
  }

  public setNodePosition(nodePosition: number[]) {
    this.nodePosition = nodePosition
    if (this.fabricObject) {
      this.fabricObject.set('left', nodePosition[0])
      this.fabricObject.set('top', nodePosition[1])
    }
  }

  public getNodePosition() {
    return this.nodePosition
  }

  public setFabricObject(fabricObject: fabric.Object | null) {
    this.fabricObject = fabricObject
  }

  public getFabricObject() {
    return this.fabricObject
  }

  public addChild(node: GameNodeBase) {
    const isAdded =
      this.children.find((child) => child.getNodeId() === node.getNodeId()) !== undefined
    if (isAdded) {
      throw Error('node has been added')
    }
    this.children.push(node)
  }

  public removeChild(node: GameNodeBase) {
    const index = this.children.findIndex((child) => child.nodeId === node.nodeId)
    if (index === -1) {
      throw Error('node has not been added')
    }
    return this.children.splice(index, 1)[0]
  }

  public getChildren() {
    return this.children
  }

  public setZIndex(zIndex: number) {
    this.zIndex = zIndex
  }

  public getZIndex() {
    return this.zIndex
  }
}

export default GameNodeBase
