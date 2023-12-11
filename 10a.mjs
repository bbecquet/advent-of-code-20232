import { readMatrix, findInMatrix } from './utils.mjs'
import * as R from 'ramda'

const matrix = readMatrix('10.txt')
const source = findInMatrix((c) => c === 'S')(matrix)[0]

const dirs = {
  l: [0, -1],
  r: [0, 1],
  t: [-1, 0],
  b: [1, 0]
}

const connections_ = {
  '-': 'lr',
  '|': 'tb',
  F: 'br',
  7: 'bl',
  J: 'tl',
  L: 'tr'
}

const getPrevDir = ([i, j], [prevI, prevJ]) => {
  const diff = [prevI - i, prevJ - j]
  return Object.entries(dirs).find(([, d]) => R.equals(diff, d))[0]
}

const getNext = (curr, prev) => {
  const char = matrix[curr[0]]?.[curr[1]]
  if (!char || char === '.' || char === 'S') return undefined

  const prevDir = getPrevDir(curr, prev)
  const conn = connections_[char]
  const nextDir = conn.replace(prevDir, '')
  const add = dirs[nextDir]
  if (!add) {
    // WTF?
    return undefined
  }
  return [curr[0] + add[0], curr[1] + add[1]]
}

const branches = Object.values(dirs).map((dir) => [
  source,
  [source[0] + dir[0], source[1] + dir[1]]
])

branches.forEach((branch) => {
  let next
  do {
    const [prev, curr] = R.takeLast(2, branch)
    next = getNext(curr, prev)
    if (next !== undefined) {
      branch.push(next)
    }
  } while (next !== undefined)
})

const result = branches
  .filter((branch) => R.equals(R.head(branch), R.last(branch)))
  .map((branch) => (branch.length - 1) / 2)
  .reduce((max, l) => Math.max(max, l), Number.MIN_VALUE)

console.log(result)
