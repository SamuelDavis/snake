export class Game {
  constructor (snake, growTimer, spriteSize, interval = 50, intervalMultiplier = 1.1) {
    this.interval = interval
    this.intervalMultiplier = intervalMultiplier
    this.snake = snake
    this.timeToGrow = performance.now() + this.interval
    this.timeToMove = performance.now() + this.snake.speed
    this.growTimer = growTimer
    this.spriteSize = spriteSize
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

  _stop () {
    if (confirm('Game over!')) document.location.reload()
    throw new Error('game over')
  }

  _checkLost () {
    const top = 0
    const right = window.innerWidth / this.spriteSize
    const bottom = window.innerHeight / this.spriteSize
    const left = 0
    const head = this.snake.body[0]

    console.log({ top, right, bottom, left, x: head.x, y: head.y })

    if (head.y < top || head.x >= right || head.y >= bottom || head.x < left) this._stop()

    this.snake.body.slice(1).reduce((head, body) => {
      if (head.x === body.x && head.y === body.y) this._stop()
      return head
    }, head)
  }

  _grow () {
    this.interval *= this.intervalMultiplier
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
