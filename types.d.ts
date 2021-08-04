export declare interface MemoizeOptions {
  max: number
}

export declare type Memoize<T> = T & {
  delete: (key: string) => boolean
  clear: () => void
  has: (key: string) => boolean
}
