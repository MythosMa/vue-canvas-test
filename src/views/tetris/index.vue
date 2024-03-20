<template>
  <canvas id="game-canvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { fabric } from 'fabric'

const initTetrisBoard = () => {
  const canvas = new fabric.StaticCanvas('game-canvas', {
    width: 400,
    height: 600,
    backgroundColor: '#c0c0c0'
  })

  const gameGroup = new fabric.Group([], {})

  const infoBoard = new fabric.Line([0, 0, 0, 600], {
    stroke: '#000',
    strokeWidth: 1
  })
  const infoGroup = new fabric.Group([infoBoard], {
    left: 301,
    top: 0
  })

  canvas.add(gameGroup, infoGroup)
}

onMounted(() => {
  initTetrisBoard()
})
</script>

<style lang="scss" scoped>
#game-canvas {
  border: 1px solid #000;
}
</style>
