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

const startNodes = Object.keys(nodes).filter((name) => name.endsWith('A'))

function getNbSteps(startNode) {
  let count = 0
  while (!startNode.endsWith('Z')) {
    const step = steps[count % steps.length]
    startNode = nodes[startNode][step]
    count++
  }
  return count
}

const minStepsByNode = startNodes.map(getNbSteps)

const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y))
const lcm = (...n) => n.reduce((x, y) => (x * y) / gcd(x, y))

console.log(lcm(...minStepsByNode))
