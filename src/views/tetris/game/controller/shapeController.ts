import { generateWarmColor } from '@/utils/tools'

class ShapeController {
  private blockPoint: number[][] = [] // 砖块坐标集合[X, Y]
  private canRotate: boolean = true
  private color: string = ''
  private currentX: number = 0
  private currentY: number = 0
  private blockType: number = 0
  constructor(lastType: number = 0) {
    this.createBlock(lastType)
    for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
      const r = Math.random() < 0.5 ? this.rotateLeft.bind(this) : this.rotateRight.bind(this)
      r()
    }
  }

  public createBlock(lastType: number) {
    this.color = generateWarmColor()
    this.blockType = (() => {
      let n
      while ((n = Math.floor(Math.random() * 7)) === lastType);
      return n
    })()
    switch (this.blockType) {
      case 0:
        // 田
        this.blockPoint = [
          [0, -1],
          [1, -1],
          [0, 0],
          [1, 0]
        ]
        this.canRotate = false
        break
      case 1:
        // L
        this.blockPoint = [
          [0, -1],
          [0, 0],
          [0, 1],
          [1, 1]
        ]
        break
      case 2:
        // 镜像L
        this.blockPoint = [
          [0, -1],
          [0, 0],
          [0, 1],
          [-1, 1]
        ]
        break
      case 3:
        // T
        this.blockPoint = [
          [0, 0],
          [-1, 0],
          [1, 0],
          [0, 1]
        ]
        break
      case 4:
        // Z
        this.blockPoint = [
          [0, 0],
          [1, 0],
          [1, -1],
          [0, 1]
        ]
        break
      case 5:
        // 镜像Z
        this.blockPoint = [
          [0, 0],
          [0, -1],
          [1, -1],
          [0, 1]
        ]
        break
      case 6:
        // I
        this.blockPoint = [
          [0, -2],
          [0, -1],
          [0, 0],
          [0, 1]
        ]
        break
    }
  }

  public getBlockType() {
    return this.blockType
  }

  public startMove(startX: number) {
    this.currentX = startX
  }

  public moveDown() {
    this.currentY += 1
  }

  public moveLeft() {
    this.currentX -= 1
  }

  public moveRight() {
    this.currentX += 1
  }

  public rotateRight() {
    if (this.canRotate) {
      this.blockPoint = this.blockPoint.map((item) => {
        return [-item[1], item[0]]
      })
    }
  }

  public getPreRotateRightPosition() {
    return this.blockPoint
      .slice()
      .map((item) => {
        return [item[1], -item[0]]
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }

  public rotateLeft() {
    if (this.canRotate) {
      this.blockPoint = this.blockPoint.map((item) => {
        return [item[1], -item[0]]
      })
    }
  }

  public getPreRotateLeftPosition() {
    return this.blockPoint
      .slice()
      .map((item) => {
        return [item[1], -item[0]]
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }

  public getBlockPosition() {
    return this.blockPoint.map((item) => {
      return [item[0] + this.currentX, item[1] + this.currentY]
    })
  }

  public getBlockColor() {
    return this.color
  }

  public getBlockBottomPosition() {
    return this.blockPoint
      .slice()
      .sort((a, b) => {
        if (a[0] !== b[0]) {
          return a[0] - b[0]
        }
        return a[1] - b[1]
      })
      .filter((item, index, array) => {
        if (index < array.length - 1) {
          if (item[0] !== array[index + 1][0]) {
            return true
          }
        } else {
          return true
        }
        return false
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }

  public getBlockTopPosition() {
    return this.blockPoint
      .slice()
      .sort((a, b) => {
        if (a[0] !== b[0]) {
          return b[0] - a[0]
        }
        return a[1] - b[1]
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }

  public getBlockLeftPosition() {
    return this.blockPoint
      .slice()
      .sort((a, b) => {
        if (a[1] !== b[1]) {
          return b[1] - a[1]
        }
        return b[0] - a[0]
      })
      .filter((item, index, array) => {
        if (index < array.length - 1) {
          if (item[1] !== array[index + 1][1]) {
            return true
          }
        } else {
          return true
        }
        return false
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }

  public getBlockRightPosition() {
    return this.blockPoint
      .slice()
      .sort((a, b) => {
        if (a[1] !== b[1]) {
          return a[1] - b[1]
        }
        return a[0] - b[0]
      })
      .filter((item, index, array) => {
        if (index < array.length - 1) {
          if (item[1] !== array[index + 1][1]) {
            return true
          }
        } else {
          return true
        }
        return false
      })
      .map((item) => {
        return [item[0] + this.currentX, item[1] + this.currentY]
      })
  }
}

export default ShapeController
