import { readLines, parseNumberList } from './utils.mjs'

const getSolutions = ([time, distance]) => {
  let solution = 0
  for (let hold = 0; hold < time; hold++) {
    if (hold * (time - hold) > distance) solution++
  }
  return solution
}

const parseRaces = ([timeLine, distLine]) => {
  const time = parseNumberList(timeLine.split(': ')[1]).join('')
  const dist = parseNumberList(distLine.split(': ')[1]).join('')
  return [[Number(time), Number(dist)]]
}

const result = parseRaces(readLines('06.txt'))
  .map(getSolutions)
  .reduce((prod, curr) => prod * curr, 1)

console.log(result)
