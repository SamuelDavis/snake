export class SpriteSheet {
  constructor (url, spriteSize, spriteMap) {
    for (let key in spriteMap) {
      if (!spriteMap.hasOwnProperty(key)) continue
      const [x, y] = spriteMap[key].map(n => n * spriteSize)
      this[key] = {
        'position': 'absolute',
        'display': 'block',
        'background-image': `url(${url})`,
        'background-repeat': 'no-repeat',
        'width': `${spriteSize}px`,
        'height': `${spriteSize}px`,
        'background-position': `-${x}px -${y}px`
      }
    }
  }
}
