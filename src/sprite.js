export default class Sprite {
  constructor (styles, { x = 0, y = 0 } = {}) {
    this.styles = styles
    this.x = x
    this.y = y
    this.el = document.createElement('i')
  }

  get style () {
    this.styles = {
      ...this.styles,
      left: `${this.x * 10}px`,
      top: `${this.y * 10}px`
    }
    return Object.keys(this.styles).reduce((acc, property) => `${acc}${property}:${this.styles[property]};`, '')
  }

  render () {
    this.el.setAttribute('style', this.style)
    if (this.el.parentNode === null) document.body.appendChild(this.el)
    return this
  }

  moveTo (x = 0, y = 0) {
    this.x = x
    this.y = y
    return this.render()
  }
}
