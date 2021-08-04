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
```

## promise

```js
import memoize from 'mini-memoize'

function promise (a, b) {
  return new Promise(resolve => {
    setTimeout(() = {
      resolve(a + b)
    }, 3000)
  })
}
const memoizePromise = memoize(promise)
memoizePromise(1, 3).then(res => (console.log(res))) // excute
memoizePromise(1, 3).then(res => (console.log(res))) // hit cache
setTimeout(() = {
  memoizePromise(1, 3).then(res => (console.log(res))) // hit cache
}, 3000)
```

## get

```js
function add (a, b) {
  return a + b
}
const memoizeAdd = memoize(add)
memoizeAdd.get(1, 2) // undefined
memoizeAdd(1, 2) // 3
memoizeAdd.get(1, 2) // 3
```

## has

```js
function add (a, b) {
  return a + b
}
const memoizeAdd = memoize(add)
memoizeAdd(1, 2) // 3
memoizeAdd.has(1, 2) // true
memoizeAdd.has(1, 3) // false
```

## delete

```js
import memoize from 'mini-memoize'

function add (a, b) {
  return a + b
}
const memoizeAdd = memoize(add)
memoizeAdd(1, 2) // excute
memoizeAdd(1, 2) // hit cache
memoizeAdd.delete(1, 2) // delete
memoizeAdd(1, 2) // excute
memoizeAdd(1, 2) // hit cache
memoizeAdd.clear() // delete all
memoizeAdd(1, 2) // excute
```

## max cache

```js
import memoize from 'mini-memoize'

function add (a, b) {
  return a + b
}
const memoizeAdd = memoize(add)
memoizeAdd(1, 2) // excute
memoizeAdd(1, 3)
memoizeAdd(1, 4)
memoizeAdd(1, 2) // excute
```

## event

```js
import memoize from 'mini-memoize'

function add (a, b) {
  return a + b
}
const memoizeAdd = memoize(add)

// type: get、delete、clear
memoizeAdd.on('delete', function (args) => {
  console.log(args)
})
```
