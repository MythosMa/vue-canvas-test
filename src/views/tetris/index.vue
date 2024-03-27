<template>
  <canvas id="game-canvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Game from './game/game'

onMounted(() => {
  Game.initGame('game-canvas', { width: 600, height: 800, gameFps: 60, isShowFps: true })
})
</script>

<style lang="scss" scoped>
#game-canvas {
  border: 1px solid #000;
}
</style>
