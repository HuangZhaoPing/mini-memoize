# mini-memoize

A simple memoization library, The volume is very small.

## Usage

```js
import memoize from 'mini-memoize'

function add (a, b) {
  return a + b
}

const memoizeAdd = memoize(add)
memoizeAdd(1, 2) // excute
memoizeAdd(1, 2) // hit cache
memoizeAdd(1, 3) // excute
memoizeAdd(1, 3) // hit cache

// promise
function promise (a, b) {
  return new Promise(resolve => {
    setTimeout(() = {
      resolve(a + b)
    })
  })
}
const memoizePromise = memoize(promise)
memoizePromise(1, 3).then(res => (console.log(res))) // excute
memoizePromise(1, 3).then(res => (console.log(res))) // hit cache
```
