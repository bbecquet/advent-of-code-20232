import { readLines, parseNumberList } from './utils.mjs'
import * as R from 'ramda'

const getNextLine = (numbers) => R.aperture(2, numbers).map(([a, b]) => b - a)

const getNextLines = ([numbers]) => {
  if (R.uniq(numbers).length === 1) return [numbers]
  return [...getNextLines([getNextLine(numbers)]), numbers]
}

const getPrediction = (lines) =>
  lines.reduce((result, line) => R.head(line) - result, 0)

const result = R.pipe(
  readLines,
  R.map(parseNumberList),
  R.map((numbers) => getNextLines([numbers])),
  R.map(getPrediction),
  R.sum
)('09.txt')

console.log(result)
