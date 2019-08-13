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
    if (now >= this.timeToGrow) {
      this.interval *= 1.10
      this.timeToGrow = performance.now() + this.interval
      this.snake.grow()
    }
    if (now >= this.timeToMove) {
      this.timeToMove = performance.now() + this.snake.speed
      this.snake.move(...this.snake.getDelta(this.snake.facing))
    }
    const secondsToGrowth = Math.max(0, (this.timeToGrow - now) / 1000)
    this.growTimer.innerText = `seconds until growth: ${secondsToGrowth.toFixed(2)}`
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
}
