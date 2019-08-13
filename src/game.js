import { DIRECTIONS } from './util.js'
import Snake from './snake.js'

export default class Game {
  constructor (snake, growTimer, spriteSize = 10, interval = 50, intervalMultiplier = 1.1) {
    const now = performance.now()
    this.snake = snake
    this.growTimer = growTimer
    this.interval = interval
    this.intervalMultiplier = intervalMultiplier
    this.timeToMove = now + this.interval
    this.timeToGrow = now + this.snake.speed
    this.containerBounds = {
      top: 0,
      right: window.innerWidth / spriteSize,
      bottom: window.innerHeight / spriteSize,
      left: 0
    }
    const directions = Object.values(DIRECTIONS)
    this.snake
      .turn(directions[Math.floor(Math.random() * directions.length)])
      .grow(
        Math.floor(Math.random() * this.containerBounds.right),
        Math.floor(Math.random() * this.containerBounds.bottom)
      )
  }

  _lose () {
    if (confirm(`Game over! Your score was ${this.snake.body.length}.`)) document.location.reload()
    throw new Error('game over')
  }

  _checkGameOver () {
    const head = this.snake.body[0]
    const { top, right, bottom, left } = this.containerBounds
    if (head.y < top || head.x >= right || head.y >= bottom || head.x < left) this._lose()
    this.snake.body.slice(1).reduce((head, body) => {
      if (head.x === body.x && head.y === body.y) this._lose()
      return head
    }, head)
  }

  _updateGrowTimer (secondsToGrowth) {
    this.growTimer.innerText = `seconds until growth: ${Math.max(0, secondsToGrowth).toFixed(2)}`
  }

  inputHandler (e) {
    if (e.key === ' ') {
      this.snake.grow()
    } else if (Object.values(DIRECTIONS).includes(e.key)) {
      this.snake.turn(e.key)
    }
  }

  update () {
    this._checkGameOver()
    const now = performance.now()
    if (now > this.timeToMove) {
      this.snake.moveBy(...Snake.getDelta(this.snake.facing))
      this.timeToMove = now + this.snake.speed
    }
    if (now > this.timeToGrow) {
      this.interval *= this.intervalMultiplier
      this.snake.grow()
      this.timeToGrow = now + this.interval
    }
    this._updateGrowTimer((this.timeToGrow - now) / 1000)
    window.requestAnimationFrame(this.update.bind(this))
  }
}
