let gameLoopDelta = 0
let isGameLooping = false
let lastGameLoopTime = 0

self.onmessage = function (event) {
  const gameFps = event.data.gameFps
  gameLoopDelta = 1000 / gameFps
  isGameLooping = true
  lastGameLoopTime = Date.now()
  while (isGameLooping) {
    const now = Date.now()
    const delta = now - lastGameLoopTime
    if (delta >= gameLoopDelta) {
      self.postMessage({
        deltaTime: delta
      })
      lastGameLoopTime = now
    }
  }
}

// self.addEventListener('message', (event) => {
//   console.log('Worker received message:', event.data)
//   const message = event.data
//   Game.initGame(message)
// })
