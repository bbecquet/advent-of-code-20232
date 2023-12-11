import { readLines } from './utils.mjs'

const isDigit = (c) => !isNaN(c)

const total = readLines('./01.txt')
  .map((line) => line.split(''))
  .map((line) => [Number(line.find(isDigit)), Number(line.findLast(isDigit))])
  .map(([tens, units]) => tens * 10 + units)
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
