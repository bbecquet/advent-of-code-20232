import { readMatrix, findInMatrix, pairs, transpose } from './utils.mjs'
import * as R from 'ramda'

const isEmptyLine = R.all(R.equals('.'))

const expandLines = (m) =>
  m.flatMap((line) => (isEmptyLine(line) ? [line, line] : [line]))

const expandUniverse = (u) =>
  R.pipe(expandLines, transpose, expandLines, transpose)(u)

const galaxyDistance = ([[x1, y1], [x2, y2]]) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

R.pipe(
  readMatrix,
  expandUniverse,
  findInMatrix((c) => c === '#'),
  pairs,
  R.map(galaxyDistance),
  R.sum,
  console.log
)('11.txt')
