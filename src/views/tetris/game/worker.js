import Game from './game'

self.onmessage = function (event) {
  const message = event.data
  Game.initGame(message)
}

// self.addEventListener('message', (event) => {
//   console.log('Worker received message:', event.data)
//   const message = event.data
//   Game.initGame(message)
// })
