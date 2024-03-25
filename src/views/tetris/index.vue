<template>
  <canvas id="game-canvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { fabric } from 'fabric'
import GameCore from './gameCore/core'

const initTetrisBoard = ({
  gameSceneBlockCountX = 10,
  gameSceneBlockCountY = 20,
  blockSize = 30,
  boardWidth = 100
}: {
  gameSceneBlockCountX?: number
  gameSceneBlockCountY?: number
  blockSize?: number
  boardWidth?: number
} = {}) => {
  const gameSceneSize = {
    width: gameSceneBlockCountX * blockSize + boardWidth,
    height: gameSceneBlockCountY * blockSize
  }
  const canvas = new fabric.StaticCanvas('game-canvas', {
    width: gameSceneSize.width,
    height: gameSceneSize.height,
    backgroundColor: '#c0c0c0'
  })

  const gameGroup = new fabric.Group([], {})

  const infoBoardDivider = new fabric.Line([0, 0, 0, gameSceneSize.height], {
    stroke: '#000',
    strokeWidth: 1
  })
  const infoBoardGroup = new fabric.Group([infoBoardDivider], {
    left: 300,
    top: 0
  })

  canvas.add(gameGroup, infoBoardGroup)

  GameCore.initGame(gameGroup, infoBoardGroup)
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
