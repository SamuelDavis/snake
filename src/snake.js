import { Sprite } from './sprite.js'

export class Snake {
  constructor (sprite, speed = 200) {
    this._sprite = sprite
    this.body = []
    this.facing = 'd'
    this.speed = speed
    this.grow(0, 0)
  }

  grow (x = -1, y = -1) {
    this.body.push(new Sprite(this._sprite, { x, y }))
    return this
  }

  move (x, y) {
    const front = this.body[0]
    const end = this.body.pop()
    end.move(x + front.x, y + front.y)
    this.body.unshift(end)
    if (y < 0) {
      this.facing = 'w'
    }
    if (x > 0) {
      this.facing = 'd'
    }
    if (y > 0) {
      this.facing = 's'
    }
    if (x < 0) {
      this.facing = 'a'
    }
    return this
  }

  getDelta (facing) {
    return { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0] }[facing] || [0, 0]
  }
}
