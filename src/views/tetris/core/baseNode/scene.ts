import GameNodeBase from './base'
import { fabric } from 'fabric'

class Scene extends GameNodeBase {
  private canvas: fabric.Canvas | null = null
  private gameFps: number = 0
  private gameLoopDelta: number = 0
  private isGameLooping: boolean = false
  private lastGameLoopTime: number = 0
  public constructor({
    gameFps,
    canvasId,
    width,
    height
  }: {
    gameFps: number
    canvasId: string
    width: number
    height: number
  }) {
    super()
    this.gameFps = gameFps
    this.gameLoopDelta = 1000 / gameFps
    this.canvas = new fabric.Canvas(canvasId, {
      width,
      height
    })
    this.isGameLooping = true
    this.gameLoop()
  }

  private gameLoop() {
    while (this.isGameLooping) {
      const currentTime = Date.now()
      const deltaTime = currentTime - this.lastGameLoopTime
      if (this.lastGameLoopTime === 0 || deltaTime >= this.gameLoopDelta) {
        this.updateLoop(deltaTime)
        this.renderLoop()
      }
    }
  }

  private rendernFabricObject(node: GameNodeBase, canvas: fabric.Canvas) {
    const nodeChildren = node.getChildren()
    const nodeFabricObject = node.getFabricObject()
    if (nodeFabricObject) {
      canvas.add(nodeFabricObject)
    }
    if (nodeChildren.length) {
      nodeChildren.sort((a, b) => {
        return a.getZIndex() - b.getZIndex()
      })
      nodeChildren.forEach((child) => {
        this.rendernFabricObject(child, canvas)
      })
    }
  }

  private renderLoop() {
    if (this.canvas) {
      this.canvas.clear()
      this.rendernFabricObject(this, this.canvas)
    }
  }

  public getGameFps(): number {
    return this.gameFps
  }
}

export default Scene
