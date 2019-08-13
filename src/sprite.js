export class Sprite {
  constructor (styles = {}, { x: x = 0, y: y = 0 } = {}) {
    this._styles = styles
    this._el = document.createElement('i')
    this.x = x
    this.y = y
    this.render()
  }

  get style () {
    this._styles.left = `${this.x * 10}px`
    this._styles.top = `${this.y * 10}px`
    return Object.keys(this._styles).reduce((acc, property) => `${acc}${property}:${this._styles[property]};`, '')
  }

  render () {
    this._el.setAttribute('style', this.style)
    if (this._el.parentNode === null) document.body.appendChild(this._el)
    return this
  }

  move (x = 0, y = 0) {
    this.x = x
    this.y = y
    return this.render()
  }
}
