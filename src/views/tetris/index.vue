<template>
  <canvas id="game-canvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import MyWorker from './game/worker.js?worker'
import Game from './game/game'

onMounted(() => {
  // const worker = new MyWorker()
  // worker.postMessage('game-canvas')
  Game.initGame('game-canvas')
})
</script>

<style lang="scss" scoped>
#game-canvas {
  border: 1px solid #000;
}
</style>
