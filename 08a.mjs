import { readLines } from './utils.mjs'

const [stepLine, ...nodeLines] = readLines('08.txt')

const steps = stepLine.split('')
const nodes = {}

nodeLines.forEach((node) => {
  const [name, L, R] = node
    .replace(/[=,\(\)]/g, '')
    .split(' ')
    .filter((t) => t)
  nodes[name] = { L, R }
})

let count = 0
let node = 'AAA'
while (node !== 'ZZZ') {
  const step = steps[count % steps.length]
  node = nodes[node][step]
  count++
}

console.log(count)
