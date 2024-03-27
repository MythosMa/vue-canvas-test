import GameNodeBase from './base'
import { fabric } from 'fabric'
import MyWorker from '../worker.js?worker'
import Node from './node'

class Scene extends GameNodeBase {
  private canvas: fabric.StaticCanvas | null = null
  private gameFps: number = 0
  private fpsText: Node | null = null
  public constructor({
    gameFps,
    canvasId,
    width,
    height,
    isShowFps
  }: {
    gameFps: number
    canvasId: string
    width: number
    height: number
    isShowFps: boolean
  }) {
    super()
    this.gameFps = gameFps
    this.canvas = new fabric.StaticCanvas(canvasId, {
      width,
      height
    })
    if (isShowFps) {
      this.fpsText = new Node()
      this.fpsText.setFabricObject(new fabric.Text('', { fill: 'white', fontSize: 16 }))
      this.fpsText.setNodePosition([0, 0])
      this.fpsText.setZIndex(Number.MAX_SAFE_INTEGER)
      this.addChild(this.fpsText)
    }
    this.gameLoop()
  }

  private gameLoop() {
    const worker = new MyWorker()
    worker.postMessage({
      gameFps: this.gameFps
    })
    worker.onmessage = (event) => {
      if (this.fpsText) {
        const textObj = this.fpsText.getFabricObject() as fabric.Text
        textObj.text = `FPS: ${(1000 / event.data.deltaTime).toFixed(2)}`
      }
      this.updateLoop(event.data.deltaTime / 1000)
      this.renderLoop()
    }
  }

  private renderFabricObject(node: GameNodeBase, canvas: fabric.StaticCanvas) {
    if (!node.getDisabled()) {
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
          this.renderFabricObject(child, canvas)
        })
      }
    }
  }

  private renderLoop() {
    if (this.canvas) {
      this.canvas.clear()
      this.canvas.setBackgroundColor('black', () => {})
      this.renderFabricObject(this, this.canvas)
    }
  }

  public getGameFps(): number {
    return this.gameFps
  }
}

export default Scene
