import Memoize, { MemoizeOptions, EventType } from 'types'
import Cache from './cache'
import Event from './event'

const stringify = JSON.stringify

export default function <T extends (...args: any[]) => any> (fn: T, options?: MemoizeOptions): Memoize<T> {
  const cache = new Cache(options ? options.max : null)
  const event = new Event()
  const memoize = <Memoize<T>>function (...args: any[]) {
    if (args.length === 0) return fn.call(this)
    const key = stringify(args)
    let value = cache.get(key)
    if (!value) {
      value = fn.call(this, ...args)
      cache.set(key, value)
    }
    return value
  }
  memoize.get = function (...args: any[]): any {
    event.emit('get', args)
    return cache.get(stringify(args))
  }
  memoize.delete = function (...args: any[]): boolean {
    event.emit('delete', args)
    return cache.delete(stringify(args))
  }
  memoize.clear = function (): void {
    event.emit('clear')
    cache.clear()
  }
  memoize.has = function (...args: any[]): boolean {
    return cache.has(stringify(args))
  }
  memoize.on = function (type: EventType, listener: (...args: any[]) => void) {
    event.on(type, listener)
  }
  memoize.off = function (type: EventType, listener: (...args: any[]) => void) {
    event.off(type, listener)
  }
  return memoize
}
