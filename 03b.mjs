import { readLines, isDigit, isAdjacentTo } from './utils.mjs'

const matrix = readLines('./03.txt').map((line) => line.split(''))

const numbers = []
const gears = []
let currentNumber = []

for (let line = 0; line < matrix.length; line++) {
  for (let col = 0; col < matrix[line].length; col++) {
    let char = matrix[line][col]
    if (isDigit(char)) {
      currentNumber.push([line, col])
    } else {
      if (char === '*') {
        gears.push([line, col])
      }
      if (currentNumber.length > 0) {
        numbers.push(currentNumber)
      }
      currentNumber = []
    }
  }
  if (currentNumber.length > 0) {
    numbers.push(currentNumber)
  }
  currentNumber = []
}

function getAdjacentNumbers(gear, numbers) {
  return numbers.filter((number) =>
    number.some(([x, y]) =>
      isAdjacentTo(x, y, ([line, col]) => line === gear[0] && col === gear[1])
    )
  )
}

const numberCoordsToNumber = (coords) =>
  Number(coords.map(([x, y]) => matrix[x][y]).join(''))

const total = gears
  .map((gear) => getAdjacentNumbers(gear, numbers))
  .filter((n) => n.length === 2)
  .map(([n1, n2]) => numberCoordsToNumber(n1) * numberCoordsToNumber(n2))
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
