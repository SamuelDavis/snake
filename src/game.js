export class Game {
  constructor (snake, interval = 100, growTimer) {
    this.interval = interval
    this.snake = snake
    this.timeToGrow = performance.now() + this.interval
    this.timeToMove = performance.now() + this.snake.speed
    this.growTimer = growTimer
  }

  update () {
    const now = performance.now()
    this._checkLost()
    if (now >= this.timeToGrow) this._grow()
    if (now >= this.timeToMove) this._move()
    this._updateGrowthTimer((this.timeToGrow - now) / 1000)
    window.requestAnimationFrame(this.update.bind(this))
  }

  keyHandler (e) {
    switch (e.key) {
      case ' ':
        this.snake.grow()
        break
      case 'w':
      case 'a':
      case 's':
      case 'd':
        this.snake.move(...this.snake.getDelta(e.key))
    }
  }

  _checkLost () {
    this.snake.body.slice(1).reduce((head, body) => {
      if (head.x === body.x && head.y === body.y) {
        if (confirm('Game over!')) document.location.reload()
        throw new Error('game over')
      }
      return head
    }, this.snake.body[0])
  }

  _grow () {
    this.interval *= 1.10
    this.timeToGrow = performance.now() + this.interval
    this.snake.grow()
  }

  _move () {
    this.timeToMove = performance.now() + this.snake.speed
    this.snake.move(...this.snake.getDelta(this.snake.facing))
  }

  _updateGrowthTimer (secondsToGrowth) {
    this.growTimer.innerText = `seconds until growth: ${Math.max(0, secondsToGrowth).toFixed(2)}`
  }
}
