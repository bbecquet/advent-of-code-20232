import { readLines, parseNumberList } from './utils.mjs'

const getSolutions = ([time, distance]) => {
  let solution = 0
  for (let hold = 0; hold < time; hold++) {
    if (hold * (time - hold) > distance) solution++
  }
  return solution
}

const parseRaces = ([timeLine, distLine]) => {
  const times = parseNumberList(timeLine.split(': ')[1])
  const dists = parseNumberList(distLine.split(': ')[1])
  return times.map((time, i) => [time, dists[i]])
}

const result = parseRaces(readLines('06.txt'))
  .map(getSolutions)
  .reduce((prod, curr) => prod * curr, 1)

console.log(result)
