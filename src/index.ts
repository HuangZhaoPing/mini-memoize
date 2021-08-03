import { MemoizeOptions } from 'types'
import Cache from './cache'

export default function (fn: (...params: any[]) => any, options?: MemoizeOptions) {
  const cache = new Cache(options.max || 100)
  function memoize (...params: any[]) {
    if (params.length === 0) return fn.call(this)
    const key = JSON.stringify(params)
    let value = cache.get(key)
    if (!value) {
      value = fn.call(this, ...params)
      cache.set(key, value)
    }
    return value
  }
  Object.defineProperties(memoize, {
    delete: { 
      value: (key: any) => cache.delete(key)
    },
    clear: {
      value: () => (cache.clear())
    },
    has: {
      value: (key: any) => cache.has(key)
    }
  })
  return memoize
}