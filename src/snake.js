import { DIRECTIONS } from './util.js'
import Sprite from './sprite.js'

export default class Snake {
  constructor (sprite, speed = 100) {
    this.sprite = sprite
    this.speed = speed
    this.facing = DIRECTIONS.RIGHT
    this.body = []
  }

  static getDelta (facing) {
    return { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0] }[facing] || [0, 0]
  }

  turn (facing) {
    const directionList = Object.values(DIRECTIONS)
    const thisIndex = directionList.indexOf(this.facing)
    const facingIndex = directionList.indexOf(facing)
    // stop snake turning back on itself
    if (thisIndex + 2 === facingIndex || facingIndex + 2 === thisIndex) {
      return
    }
    this.facing = facing
    return this
  }

  grow (x = -1, y = -1) {
    this.body.push(new Sprite(this.sprite, { x, y }))
    return this
  }

  moveBy (deltaX, deltaY) {
    const front = this.body[0]
    const end = this.body.pop()
    end.moveTo(deltaX + front.x, deltaY + front.y)
    this.body.unshift(end)
    return this
  }
}
