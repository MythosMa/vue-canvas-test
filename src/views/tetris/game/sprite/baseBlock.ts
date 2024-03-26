class BaseBlock {
  blockInfo: number[][] = []
  canRotate: boolean = false
  constructor() {}

  rotateRight() {
    this.blockInfo = this.blockInfo.map((item) => {
      return [-item[1], item[0]]
    })
  }

  rotateLeft() {
    this.blockInfo = this.blockInfo.map((item) => {
      return [item[1], -item[0]]
    })
  }
}

export default BaseBlock
