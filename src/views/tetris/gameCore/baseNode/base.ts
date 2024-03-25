import { uuid } from 'uuidv4'
import { fabric } from 'fabric'

class GameNodeBase {
  protected nodeRenderGroup: fabric.Group | null = null
  private childGroups: GameNodeBase[] = []
  private nodeId: string = ''

  constructor({
    width,
    height,
    left,
    top
  }: {
    width: number
    height: number
    left: number
    top: number
  }) {
    this.nodeId = uuid()
    this.nodeRenderGroup = new fabric.Group([], {
      width,
      height,
      left,
      top
    })
  }

  public render() {
    this.childGroups.forEach((child) => {
      child.render()
    })
  }

  public update() {
    this.childGroups.forEach((child) => {
      child.update()
    })
  }

  public addChild(node: GameNodeBase) {
    if (this.nodeRenderGroup && node.nodeRenderGroup) {
      this.nodeRenderGroup.add(node.nodeRenderGroup)
    }
  }

  public removeChild(node: GameNodeBase) {
    const index = this.childGroups.findIndex((child) => child.nodeId === node.nodeId)
    if (index !== -1) {
      this.childGroups.splice(index, 1)
    }
  }
}

export default GameNodeBase
