import { readLines } from './utils.mjs'

const digits = Object.entries({
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
})

const findDigits = (str) => {
  const found = []
  for (let i = 0; i < str.length; i++) {
    digits.forEach(([match, value]) => {
      if (str.substring(i, i + match.length) === match) {
        found.push(value)
      }
    })
  }
  return [found[0], found[found.length - 1]]
}

const total = readLines('./01.txt')
  .map(findDigits)
  .map(([tens, units]) => tens * 10 + units)
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
