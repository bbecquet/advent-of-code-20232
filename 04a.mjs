import { readLines, parseNumberList } from './utils.mjs'

const parseLine = (line) => line.split(':')[1].split('|').map(parseNumberList)

const computeScore = ([winning, entries]) => {
  const nbMatches = entries.filter((e) => winning.includes(e)).length
  return nbMatches === 0 ? 0 : Math.pow(2, nbMatches - 1)
}

const total = readLines('./04.txt')
  .map(parseLine)
  .map(computeScore)
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
