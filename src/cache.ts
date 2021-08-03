// LRUCache
export default class Cache {
  private max: number
  private cache: Map<any, any>
  constructor (max: number) {
    this.max = max
    this.cache = new Map()
  }
  get (key: any) {
    const value = this.cache.get(key)
    if (value) {
      this.cache.delete(key)
      this.cache.set(key, value)  
    }
    return value
  }
  set (key: any, value: any) {
    if (this.max && this.cache.size === this.max) {
      if (this.cache.has(key)) {
        this.cache.delete(key)
      } else {
        this.cache.delete(this.cache.keys().next().value)
      }
    }
    this.cache.set(key, value)
  }
  delete (key: any) {
    return this.cache.delete(key)
  }
  clear () {
    this.cache.clear()
  }
  has (key: any) {
    return this.cache.has(key)
  }
}
