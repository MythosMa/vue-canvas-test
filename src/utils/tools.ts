export const generateRandomColor = (): string => {
  // 生成随机的 R、G、B 分量值
  const r = Math.floor(Math.random() * 256) // 0 到 255 之间的随机数
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  // 将 R、G、B 分量值格式化为十六进制，并确保每个分量值始终为两位
  const hexR = ('0' + r.toString(16)).slice(-2)
  const hexG = ('0' + g.toString(16)).slice(-2)
  const hexB = ('0' + b.toString(16)).slice(-2)

  // 返回十六进制颜色值的字符串表示
  return '#' + hexR + hexG + hexB
}

export const generateWarmColor = (): string => {
  const hue = Math.floor(Math.random() * 50) + 20 // 20 到 70 之间的随机色调
  const saturation = Math.floor(Math.random() * 50) + 50 // 50 到 100 之间的随机饱和度
  const lightness = Math.floor(Math.random() * 30) + 50 // 50 到 80 之间的随机亮度

  // 将 HSL 颜色值转换为 RGB 颜色值
  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
    const m = l - c / 2
    let r = 0,
      g = 0,
      b = 0
    if (0 <= h && h < 60) {
      ;[r, g, b] = [c, x, 0]
    } else if (60 <= h && h < 120) {
      ;[r, g, b] = [x, c, 0]
    } else if (120 <= h && h < 180) {
      ;[r, g, b] = [0, c, x]
    } else if (180 <= h && h < 240) {
      ;[r, g, b] = [0, x, c]
    } else if (240 <= h && h < 300) {
      ;[r, g, b] = [x, 0, c]
    } else if (300 <= h && h < 360) {
      ;[r, g, b] = [c, 0, x]
    }
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255]
  }

  const [red, green, blue] = hslToRgb(hue, saturation / 100, lightness / 100)

  // 将 RGB 颜色值转换为十六进制格式
  const toHex = (num: number): string => {
    const hex = Math.round(num).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`
}
