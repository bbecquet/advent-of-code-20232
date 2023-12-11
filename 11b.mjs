import {
  readMatrix,
  findInMatrix,
  logMatrix,
  pairs,
  transpose
} from './utils.mjs'
import * as R from 'ramda'

const expansionRate = 1000000

const matrix = readMatrix('11.txt')

const isEmptyLine = R.all(R.equals('.'))

const emptyLineIndices = (matrix) =>
  matrix
    .map((line, i) => (isEmptyLine(line) ? i : undefined))
    .filter((i) => i !== undefined)

const emptyRows = emptyLineIndices(matrix)
const emptyCols = emptyLineIndices(transpose(matrix))

console.log(emptyRows, emptyCols)

const galaxyDistance = ([[x1, y1], [x2, y2]]) => {
  const minX = Math.min(x1, x2)
  const minY = Math.min(y1, y2)
  const rows = Array(Math.max(x1, x2) - minX).fill(1)
  const cols = Array(Math.max(y1, y2) - minY).fill(1)

  return (
    R.sum(
      rows.map((_, i) => {
        return emptyRows.includes(minX + i) ? expansionRate : 1
      })
    ) +
    R.sum(
      cols.map((_, i) => (emptyCols.includes(minY + i) ? expansionRate : 1))
    )
  )
}

R.pipe(
  findInMatrix((c) => c === '#'),
  pairs,
  R.tap(console.log),
  R.map(galaxyDistance),
  R.tap(console.log),
  R.sum(),
  console.log
)(matrix)
