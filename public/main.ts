import memoize from '../src/index'

function add (a: number, b: number): number {
  console.log('excute', a, b)
  return a + b
}
const memoizeAdd = memoize(add, { max: 2 })

memoizeAdd(1, 2) // excute
memoizeAdd(1, 2) // hit cahce
memoizeAdd(1, 3)
memoizeAdd(1, 4)
memoizeAdd(1, 2) // excute
