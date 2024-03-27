import { generateWarmColor } from '@/utils/tools'

class ShapeController {
  private blockInfo: number[][] = []
  private canRotate: boolean = true
  private color: string = ''
  constructor() {
    this.createBlock()
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
      const r = Math.random() < 0.5 ? this.rotateLeft.bind(this) : this.rotateRight.bind(this)
      r()
    }
  }

  public createBlock() {
    this.color = generateWarmColor()
    const type = Math.floor(Math.random() * 7)
    switch (type) {
      case 0:
        // 田
        this.blockInfo = [
          [0, -1],
          [1, -1],
          [0, 0],
          [1, 0]
        ]
        this.canRotate = false
        break
      case 1:
        // L
        this.blockInfo = [
          [0, -1],
          [0, 0],
          [0, 1],
          [1, 1]
        ]
        break
      case 2:
        // 镜像L
        this.blockInfo = [
          [0, -1],
          [0, 0],
          [0, 1],
          [-1, 1]
        ]
        break
      case 3:
        // T
        this.blockInfo = [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, 1]
        ]
        break
      case 4:
        // Z
        this.blockInfo = [
          [0, 0],
          [1, 0],
          [1, -1],
          [0, 1]
        ]
        break
      case 5:
        // 镜像Z
        this.blockInfo = [
          [0, 0],
          [0, -1],
          [1, -1],
          [0, 1]
        ]
        break
      case 6:
        // I
        this.blockInfo = [
          [0, -2],
          [0, -1],
          [0, 0],
          [0, 1]
        ]
        break
    }
  }

  public startMove(startX: number) {
    this.blockInfo.forEach((item) => {
      item[0] += startX
    })
  }

  public moveDown() {
    this.blockInfo.forEach((item) => {
      item[1] += 1
    })
  }

  public moveLeft() {
    this.blockInfo.forEach((item) => {
      item[0] -= 1
    })
  }

  public moveRight() {
    this.blockInfo.forEach((item) => {
      item[0] += 1
    })
  }

  public rotateRight() {
    if (this.canRotate) {
      this.blockInfo = this.blockInfo.map((item) => {
        return [-item[1], item[0]]
      })
    }
  }

  public rotateLeft() {
    if (this.canRotate) {
      this.blockInfo = this.blockInfo.map((item) => {
        return [item[1], -item[0]]
      })
    }
  }

  public getBlockInfo() {
    return this.blockInfo
  }

  public getBlockColor() {
    return this.color
  }
}

export default ShapeController
