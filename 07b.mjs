import { readLines } from './utils.mjs'
import * as R from 'ramda'

const ranks = 'J23456789TQKA'.split('')

const rank = (c) => ranks.indexOf(c) + 1

const parseHand = (line) => {
  const [cards, bid] = line.split(' ')
  return {
    cards: cards.split(''),
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

const cardsStrength = (cards) => {
  const s = R.pipe(
    R.map(rank),
    R.sort((a, b) => b - a),
    R.groupWith(R.equals),
    R.map(R.length),
    R.sort((a, b) => b - a)
  )(cards)

  return strengths.findIndex((strength) => R.equals(strength, s))
}

const handStrength = (hand) => {
  if (R.equals(hand.cards, ['J', 'J', 'J', 'J', 'J'])) {
    return { ...hand, str: 6 }
  }

  const strengthsWithJ = ranks
    .slice(1)
    .map((value) => hand.cards.map((c) => (c === 'J' ? value : c)))
    .map(cardsStrength)

  return {
    ...hand,
    str: Math.max(...strengthsWithJ)
  }
}

const cardToNumber = (cards) =>
  Number(
    cards
      .map(rank)
      .map((c) => c.toString().padStart(2, '0'))
      .join('')
  )

const compareHands = (h1, h2) => {
  if (h1.str !== h2.str) {
    return h1.str - h2.str
  }
  return cardToNumber(h1.cards) - cardToNumber(h2.cards)
}

const hands = R.pipe(
  R.map(parseHand),
  R.map(handStrength),
  R.sort(compareHands)
)(readLines('07.txt'))

const result = hands
  .map(({ bid }, i) => bid * (i + 1))
  .reduce((sum, curr) => curr + sum, 0)
console.log(result)
