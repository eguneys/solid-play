import { Vec2 } from './vec2'

export class Sticky<Item> {

  static make = (free: Array<Vec2>) => { return new Sticky(free) }

  released_positions: Map<Item, Array<Vec2>>

  constructor(readonly free: Array<Vec2>) {
    this.released_positions = new Map<Item, Array<Vec2>>()
  }

  acquire_pos(item: Item, v: Vec2, instant_track: boolean = false) {
    let _ = this.released_positions.get(item)
    if (!instant_track && _ && _.length > 0) {
      _.sort((a, b) => b.distance(v) - a.distance(v))
      return _.pop()
    } else {
      let res = this.free.pop()!
      res.x = v.x
      res.y = v.y
      return res
    }
  }
  reset_fix_all() {
    for (let poss of this.released_positions.values()) {
      poss.forEach(_ => this.free.push(_))
    }
    this.released_positions = new Map()
  }
  release_pos(item: Item, pos: Vec2) {
    let res = this.released_positions.get(item)
    if (!res) {
      res = []
      this.released_positions.set(item, res)
    }
    res.push(pos)
  }
}
