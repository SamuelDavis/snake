import { errorHandler } from './src/util.js'
import main from './src/main.js'

window.addEventListener('error', errorHandler)
document.addEventListener('DOMContentLoaded', main)
