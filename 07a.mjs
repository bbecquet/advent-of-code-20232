import { readLines } from './utils.mjs'
import * as R from 'ramda'

const ranks = '23456789TJQKA'.split('')

const rank = (c) => ranks.indexOf(c)

const parseHand = (line) => {
  const [cards, bid] = line.split(' ')
  return {
    cards: cards.split('').map(rank),
    bid: Number(bid)
  }
}

const strengths = [
  [1, 1, 1, 1, 1],
  [2, 1, 1, 1],
  [2, 2, 1],
  [3, 1, 1],
  [3, 2],
  [4, 1],
  [5]
]

const handStrength = (hand) => {
  const str = R.pipe(
    R.groupBy(R.identity),
    R.values,
    R.map(R.length),
    R.sort((a, b) => b - a),
    (pattern) => strengths.findIndex((strength) => R.equals(strength, pattern))
  )(hand.cards)

  return { ...hand, str }
}

const cardToNumber = (cards) =>
  Number(cards.map((c) => c.toString().padStart(2, '0')).join(''))

const compareHands = (h1, h2) => {
  return h1.str !== h2.str
    ? h1.str - h2.str
    : cardToNumber(h1.cards) - cardToNumber(h2.cards)
}

const result = R.pipe(
  R.map(parseHand),
  R.map(handStrength),
  R.sort(compareHands),
  R.addIndex(R.map)(({ bid }, i) => bid * (i + 1)),
  R.sum
)(readLines('07.txt'))

console.log(result)
