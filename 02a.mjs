import { readLines } from './utils.mjs'

const parseGame = (line) => {
  const [gameName, roundStrings = []] = line.split(': ')
  const id = Number(gameName.split(' ')[1])
  const rounds = roundStrings.split('; ').map(parseGameRound)
  return { id, rounds }
}

const parseGameRound = (roundString) => {
  return roundString.split(', ').reduce(
    (prev, item) => {
      const [value, color] = item.split(' ')
      return {
        ...prev,
        [color]: Number(value)
      }
    },
    { blue: 0, green: 0, red: 0 }
  )
}

const LIMITS = { red: 12, green: 13, blue: 14 }

const isRoundValid = (round) => {
  return Object.entries(round).every(([color, value]) => value <= LIMITS[color])
}

const isGameValid = (game) => game.rounds.every(isRoundValid)

const total = readLines('./02.txt')
  .map(parseGame)
  .filter(isGameValid)
  .reduce((sum, curr) => sum + curr.id, 0)

console.log(total)
