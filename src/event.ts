export default class Event {
  private events: Map<any, any[]>
  constructor () {
    this.events = new Map()
  }
  on (type: string, listener: (...args: any[]) => void) {
    let listeners = this.events.get(type)
    if (!listeners) {
      this.events.set(type, [])
      listeners = this.events.get(type)
    }
    listeners.push(listener)
  }
  off (type: string, listener: (...args: any[]) => void) {
    const listeners = this.events.get(type)
    if (listeners) {
      const index = listeners.indexOf(listener)
      index > -1 && listeners.splice(index, 1)
    }
  }
  emit (type: string, ...args: any[]) {
    const listeners = this.events.get(type)
    if (listeners) {
      listeners.forEach(fn => {
        fn.apply(this, args)
      })
    }
  }
}
