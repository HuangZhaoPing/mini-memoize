declare interface MemoizeOptions {
  max: number
}

declare type EventType = 'get' | 'delete' | 'clear'

declare type Memoize<T> = T & {
  get (...args: any[]): any
  delete (...args: any[]): boolean
  clear (): void
  has (...args: any[]): boolean
  on (type: EventType, listener: (...args: any[]) => void): void
  off (type: EventType, listener: (...args: any[]) => void): void
}

export {
  MemoizeOptions,
  EventType,
  Memoize
}

export default function <T extends (...args: any[]) => any> (fn: T, options?: MemoizeOptions): Memoize<T>
