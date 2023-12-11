import { readLines, parseNumberList } from './utils.mjs'

const parseLine = (line) => line.split(':')[1].split('|').map(parseNumberList)

const prepareLine = ([winning, entries]) => {
  const score = entries.filter((e) => winning.includes(e)).length
  return { score, instances: 1 }
}

const stack = readLines('./04.txt').map(parseLine).map(prepareLine)

stack.forEach((card, i) => {
  for (let inst = 0; inst < card.instances; inst++) {
    for (let j = 1; j < card.score + 1 && j < stack.length; j++) {
      stack[i + j].instances++
    }
  }
})

const total = stack.map((c) => c.instances).reduce((sum, curr) => sum + curr, 0)

console.log(total)
