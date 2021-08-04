import { MemoizeOptions, Memoize } from 'types'
import Cache from './cache'

export default function <T extends (...args: any[]) => any> (fn: T, options?: MemoizeOptions): Memoize<T> {
  const cache = new Cache(options ? options.max : null)
  const memoize = <Memoize<T>>function (...params: any[]) {
    if (params.length === 0) return fn.call(this)
    const key = JSON.stringify(params)
    let value = cache.get(key)
    if (!value) {
      value = fn.call(this, ...params)
      cache.set(key, value)
    }
    return value
  }
  memoize.delete = function (key: string): boolean {
    return cache.delete(key)
  }
  memoize.clear = function (): void {
    cache.clear()
  }
  memoize.has = function (key: string): boolean {
    return cache.has(key)
  }
  return memoize
}
