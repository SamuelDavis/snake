import { Snake } from './snake.js'
import { SpriteSheet } from './spritesheet.js'

export default function () {
  const spriteSheet = new SpriteSheet('http://rogueliketutorials.com/images/arial10x10.png', 10, {
    '@': [0, 1]
  })

  const snake = new Snake(spriteSheet['@']).grow()

  let interval = 100
  let timeToGrow = performance.now() + interval
  let timeToMove = performance.now() + snake.speed

  const growTimer = document.createElement('span')
  growTimer.setAttribute('style', 'color:white;z-index:99;')
  document.body.appendChild(growTimer)

  const gameLoop = setInterval(() => {
    const now = performance.now()
    if (now >= timeToGrow) {
      interval *= 1.10
      timeToGrow = performance.now() + interval
      snake.grow()
    }
    if (now >= timeToMove) {
      timeToMove = performance.now() + snake.speed
      snake.move(...snake.getDelta(snake.facing))
    }
    const secondsToGrowth = Math.max(0, (timeToGrow - now) / 1000)
    growTimer.innerText = `seconds until growth: ${secondsToGrowth.toFixed(2)}`
  }, 50)

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case ' ':
        snake.grow()
        break
      case 'w':
      case 'a':
      case 's':
      case 'd':
        snake.move(...snake.getDelta(e.key))
    }
  })
}
