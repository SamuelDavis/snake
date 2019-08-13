import SpriteSheet from './spritesheet.js'
import Snake from './snake.js'
import Game from './game.js'

export default function () {
  const spriteSize = 10
  const spriteSheet = new SpriteSheet('http://rogueliketutorials.com/images/arial10x10.png', spriteSize, {
    at: [0, 1]
  })
  const snake = new Snake(spriteSheet.at)
  const growTimer = document.getElementById('grow-timer')
  const game = new Game(snake, growTimer, spriteSize)
  document.addEventListener('keydown', game.inputHandler.bind(game))
  window.requestAnimationFrame(game.update.bind(game))
}
