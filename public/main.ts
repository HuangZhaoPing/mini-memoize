import memoize from '../src/index'

function add (a: number, b: number): number {
  console.log('excute')
  return a + b
}
const memoizeAdd = memoize(add)
console.log(memoizeAdd(1, 2))
console.log(memoizeAdd(1, 2))
