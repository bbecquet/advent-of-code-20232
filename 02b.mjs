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
    { red: 0, green: 0, blue: 0 }
  )
}

const getMins = (rounds) => {
  return rounds.reduce(
    (curr, { red, green, blue }) => ({
      red: Math.max(red, curr.red),
      green: Math.max(green, curr.green),
      blue: Math.max(blue, curr.blue)
    }),
    { red: 0, green: 0, blue: 0 }
  )
}

const total = readLines('./02.txt')
  .map(parseGame)
  .map((game) => getMins(game.rounds))
  .map(({ red, green, blue }) => red * green * blue)
  .reduce((sum, curr) => sum + curr, 0)

console.log(total)
