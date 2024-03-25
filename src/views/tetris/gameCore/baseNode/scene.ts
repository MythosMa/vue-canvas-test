import GameNodeBase from './base'
import { fabric } from 'fabric'

class Scene extends GameNodeBase {
  private canvas: fabric.Canvas | null = null
  public constructor({
    canvasId,
    width,
    height
  }: {
    canvasId: string
    width: number
    height: number
  }) {
    super({ width, height, left: 0, top: 0 })
    this.canvas = new fabric.Canvas(canvasId, {
      width,
      height
    })
    if (this.nodeRenderGroup) {
      this.canvas.add(this.nodeRenderGroup)
    }
  }
}

export default Scene
