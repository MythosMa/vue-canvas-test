let gameLoopDelta = 0
let isGameLooping = false
let isGameUpdateStart = false
let lastGameLoopTime = 0

self.onmessage = function (event) {
  if (event.data.type === "start") {
    const gameFps = event.data.gameFps
    gameLoopDelta = 1000 / gameFps
    isGameLooping = true
    lastGameLoopTime = Date.now()
    while (isGameLooping) {
      const now = Date.now()
      const delta = now - lastGameLoopTime
      if (!isGameUpdateStart && delta >= gameLoopDelta) {
        self.postMessage({
          deltaTime: delta
        })
        lastGameLoopTime = now
      }
    }
  }
  if (event.data.type === "stop") {
    isGameLooping = false
  }
  if (event.data.type === "updateStart") {
    isGameUpdateStart = true
  }
  if (event.data.type === "updateEnd") {
    isGameUpdateStart = false
  }
}

// self.addEventListener('message', (event) => {
//   console.log('Worker received message:', event.data)
//   const message = event.data
//   Game.initGame(message)
// })
