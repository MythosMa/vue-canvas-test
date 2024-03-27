class GameNodeBase {
  private nodeId: string = ''
  private nodePosition: number[] = [0, 0]
  private zIndex: number = 0
  private children: GameNodeBase[] = []
  private parent: GameNodeBase | null = null
  private fabricObject: fabric.Object | null = null
  private isDisabled: boolean = false

  constructor(fabricObject: fabric.Object | null = null) {
    this.nodeId = Math.random() + ''
    this.fabricObject = fabricObject
    this.init()
  }

  protected init() {}

  public updateLoop(detlaTime: number) {
    this.children.forEach((child) => {
      child.updateLoop(detlaTime)
    })
    this.refreshFabricObjectPosition()
    if (!this.isDisabled) {
      this.update(detlaTime)
    }
  }

  public update(detlaTime: number) {}

  public getNodeId() {
    return this.nodeId
  }

  private refreshFabricObjectPosition() {
    if (this.fabricObject) {
      this.fabricObject?.set('left', this.getWorldPosition()[0])
      this.fabricObject?.set('top', this.getWorldPosition()[1])
    }
  }

  public setNodePosition(nodePosition: number[]) {
    this.nodePosition = nodePosition
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

  public setParent(parent: GameNodeBase | null) {
    this.parent = parent
  }

  public getParent() {
    return this.parent
  }

  public getWorldPosition() {
    const position = [this.nodePosition[0], this.nodePosition[1]]
    let parent = this.parent
    while (parent) {
      position[0] += parent.nodePosition[0]
      position[1] += parent.nodePosition[1]
      parent = parent.parent
    }
    return position
  }

  public nodePositionToWorldPosition(node: GameNodeBase) {
    const nodePosition = node.getNodePosition()
    const position = [nodePosition[0], nodePosition[1]]
    let parent = node.parent
    while (parent) {
      position[0] += parent.nodePosition[0]
      position[1] += parent.nodePosition[1]
      parent = parent.parent
    }
    return position
  }

  public worldPositionToNodePosition(worldPosition: number[]) {
    const position = [worldPosition[0], worldPosition[1]]
    let parent = this.parent
    while (parent) {
      position[0] -= parent.nodePosition[0]
      position[1] -= parent.nodePosition[1]
      parent = parent.parent
    }
  }

  public addChild(node: GameNodeBase) {
    const isAdded =
      this.children.find((child) => child.getNodeId() === node.getNodeId()) !== undefined
    if (isAdded) {
      throw Error('node has been added')
    }
    this.children.push(node)
    node.parent = this
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

  public setDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled
  }

  public getDisabled() {
    return this.isDisabled
  }
}

export default GameNodeBase
