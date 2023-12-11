import { readLines, isDigit, isAdjacentTo } from './utils.mjs'

const matrix = readLines('./03.txt').map((line) => line.split(''))

const isSymbol = (c) => c && !isDigit(c) && c != '.'

const isAdjacentToSymbol = (matrix, x, y) => {
  return isAdjacentTo(x, y, ([line, col]) => isSymbol(matrix[line]?.[col]))
}

const validCodes = []
let code = ''
let isValidCode = false

for (let line = 0; line < matrix.length; line++) {
  for (let col = 0; col < matrix[line].length; col++) {
    let char = matrix[line][col]
    if (isDigit(char)) {
      code += char
      isValidCode = isValidCode || isAdjacentToSymbol(matrix, line, col)
    } else {
      if (isValidCode) {
        validCodes.push(code)
      }
      code = ''
      isValidCode = false
    }
  }
  if (isValidCode) {
    validCodes.push(code)
  }
  code = ''
  isValidCode = false
}

const total = validCodes
  .map((code) => Number(code))
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
