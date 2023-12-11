import { readFile, parseNumberList } from './utils.mjs'

const parseMapping = (lines) => {
  const name = lines[0].split(' ')[1]
  const ranges = lines.slice(1).map((line) => {
    const [dest, src, len] = parseNumberList(line)
    return { dest, src, len }
  })
  return { name, ranges }
}

const mapNumber = (number, { ranges }) => {
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]
    if (number >= range.src && number < range.src + range.len) {
      return range.dest + (number - range.src)
    }
  }
  return number
}

const [rawSeeds, ...rawMaps] = readFile('05.txt').split('\n\n')
const seeds = parseNumberList(rawSeeds.split(': ')[1])
const mappings = rawMaps.map((rawMap) => rawMap.split('\n')).map(parseMapping)

const result = seeds
  .map((seed) =>
    mappings.reduce((prev, mapping) => mapNumber(prev, mapping), seed)
  )
  .reduce((min, curr) => Math.min(min, curr), Number.MAX_VALUE)

console.log(result)
