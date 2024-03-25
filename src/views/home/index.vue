<template>
  <canvas id="custom-canvas"></canvas>
  <button @click="test">button</button>
  <!-- <textarea class="textarea">AAAAAAAAAAAAAAAAAAAAAAAAABBBBBBBBBBBBBBBBBC</textarea> -->
</template>

<script setup lang="ts">
import { fabric } from 'fabric'
import { onMounted } from 'vue'

let canvas: fabric.Canvas
const canvasInit = () => {
  canvas = new fabric.Canvas('custom-canvas', { width: 400, height: 400 })

  const rect = new fabric.Rect({
    width: 400,
    height: 400,
    fill: '#0000ff',
    left: 10,
    top: 10
  })

  const circle = new fabric.Circle({
    radius: 100,
    fill: '#ffffff',
    left: 10,
    top: 10
  })

  const ellipse = new fabric.Ellipse({
    rx: 100,
    ry: 50,
    fill: '#ccffff',
    left: 10,
    top: 10
  })

  const triangle = new fabric.Triangle({
    width: 100,
    height: 100,
    fill: '#00ffff',
    left: 10,
    top: 10
  })

  const line = new fabric.Line([10, 10, 200, 200], {
    stroke: '#ffccff',
    strokeWidth: 5
  })

  const polyLine = new fabric.Polyline(
    [
      { x: 10, y: 10 },
      { x: 200, y: 100 },
      { x: 400, y: 400 }
    ],
    {
      stroke: '#ff00ff',
      strokeWidth: 5,
      fill: 'transparent'
    }
  )

  const polyGon = new fabric.Polygon(
    [
      { x: 10, y: 10 },
      { x: 100, y: 200 },
      { x: 400, y: 400 }
    ],
    {
      stroke: '#ffffcc',
      strokeWidth: 5,
      fill: 'transparent'
    }
  )

  const path = new fabric.Path('M 10 10 L 100 300 L 200 300 Z', {
    stroke: '#bb0000',
    strokeWidth: 5,
    fill: 'transparent'
  })

  const text = new fabric.Textbox('Hello World', {
    left: 10,
    top: 10,
    width: 200,
    fill: '#ff00cc'
  })

  const iText = new fabric.IText('Hello new World', {
    left: 10,
    top: 50,
    width: 200,
    fill: '#ff00cc'
  })

  const textbox = new fabric.Textbox('Hello bot World', {
    left: 10,
    top: 100,
    width: 200,
    fill: '#ff00cc'
  })

  const colorCircle = new fabric.Circle({
    radius: 100,
    left: 500,
    top: 10
  })

  const colorCirlcGradient = new fabric.Gradient({
    type: 'radial',
    coords: {
      r1: 100, // 该属性仅径向渐变可用，外圆半径
      r2: 10, // 该属性仅径向渐变可用，外圆半径
      x1: 100, // 焦点的x坐标
      y1: 100, // 焦点的y坐标
      x2: 100, // 中心点的x坐标
      y2: 100 // 中心点的y坐标
    },
    colorStops: [
      { offset: 0, color: '#fee140' },
      { offset: 1, color: '#fa709a' }
    ]
  })

  colorCircle.set({ fill: colorCirlcGradient })

  // canvas.add(
  //   rect,
  //   circle,
  //   ellipse,
  //   triangle,
  //   line,
  //   polyLine,
  //   polyGon,
  //   path,
  //   text,
  //   iText,
  //   textbox,
  //   colorCircle
  // )

  const group1Rect1 = new fabric.Rect({
    width: 200,
    height: 200,
    fill: '#FFA000'
  })
  const group1Rect2 = new fabric.Rect({
    width: 200,
    height: 200,
    fill: '#FFB000',
    left: 10,
    top: 10
  })

  const group1 = new fabric.Group([group1Rect1, group1Rect2], {
    left: 10,
    top: 10
  })

  group1Rect1.moveTo(-1)

  const group2Rect1 = new fabric.Rect({
    width: 200,
    height: 200,
    fill: '#AAA000'
  })
  const group2Rect2 = new fabric.Rect({
    width: 200,
    height: 200,
    fill: '#AAB000',
    left: 10,
    top: 10
  })

  const group2 = new fabric.Group([group2Rect1, group2Rect2], {
    left: 30,
    top: 30
  })

  canvas.add(group3)

  // canvas.add(group1, group2)
}

const pathTest = new fabric.Path('M 10 10 L 100 300 L 200 300 Z', {
  stroke: '#bb0000',
  strokeWidth: 5,
  fill: 'transparent'
})

const group3 = new fabric.Group([pathTest], {
  left: 0,
  top: 0
})

onMounted(() => {
  canvasInit()
})

const test = () => {
  console.log('test', pathTest)
  pathTest.path[0][1] = pathTest.path[0][1] + 10
  pathTest.path[0][2] = pathTest.path[0][2] + 10
  pathTest.dirty = true

  canvas.requestRenderAll()
}
</script>

<style lang="scss">
.textarea {
  width: 200px;
  height: 200px;
  word-break: break-all;
  writing-mode: vertical-lr;
  transform: rotate(-90deg);
}
</style>
