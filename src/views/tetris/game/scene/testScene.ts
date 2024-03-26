import Scene from '../../core/baseNode/scene'

class TestScene extends Scene {
  constructor({
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
    super({ gameFps, canvasId, width, height })
  }
}

export default TestScene
