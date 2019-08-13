import { SpriteSheet } from './spritesheet.js'
import { Game } from './game.js'
import { Snake } from './snake.js'

export default function () {
  const spriteSheet = new SpriteSheet('http://rogueliketutorials.com/images/arial10x10.png', 10, {
    at: [0, 1]
  })
  const snake = new Snake(spriteSheet.at)
  const growTimer = document.getElementById('grow-timer')
  const game = new Game(snake, 100, growTimer)

  document.addEventListener('keydown', game.keyHandler.bind(game))
  window.requestAnimationFrame(game.update.bind(game))
}

