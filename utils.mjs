import { readFileSync } from 'fs'

export const readFile = (fileName) => readFileSync(fileName, 'utf8').toString()

export const readLines = (fileName) =>
  readFile(fileName)
    .split('\n')
    .filter((l) => l)

export const readMatrix = (fileName) =>
  readLines(fileName).map((line) => line.split(''))

export const isDigit = (c) => !isNaN(c)

export const isAdjacentTo = (x, y, check) => {
  return [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1]
  ].some(check)
}

export const parseNumberList = (str) =>
  str
    .split(' ')
    .filter((t) => t)
    .map((n) => Number(n))

export const pairs = (arr) =>
  arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat()

export const findInMatrix = (predicate) => (matrix) => {
  const results = []
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (predicate(matrix[i][j])) results.push([i, j])
    }
  }
  return results
}

export const logMatrix = (matrix) => {
  console.log(matrix.map((line) => line.join('')).join('\n'))
  return matrix
}

export function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]))
}
