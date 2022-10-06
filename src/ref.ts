import { Signal } from 'solid-js'
import { createSignal, createMemo } from 'solid-js'
import { read, owrite } from './play'
import { Memo } from './types'
import { Vec2 } from './vec2'

export class Ref {

  static get make() { return new Ref() }

  get $ref() {
    return read(this._$ref)
  }

  set $ref($ref: HTMLElement | undefined) {
    owrite(this._$ref, $ref)
  }

  get_normal_at_abs_pos(v: Vec2) {
    let { size, orig } = this

    if (!!size && !!orig) {
      return v.sub(orig).div(size)
    }
    return undefined
  }

  get size() {
    let { rect } = this
    if (rect) {
      return Vec2.make(rect.width, rect.height)
    }
    return undefined
  }

  get orig() {
    let { rect } = this
    if (rect) {
      return Vec2.make(rect.x, rect.y)
    }
    return undefined
  }

  get rect() {
    return this.m_rect()
  }

  m_rect: Memo<DOMRect | undefined>;
  _$ref: Signal<HTMLElement | undefined>;
  _$clear_bounds: Signal<undefined>

  constructor() {
    this._$clear_bounds = createSignal(undefined, { equals: false })
    this._$ref = createSignal()
    this.m_rect = createMemo(() => {
      read(this._$clear_bounds)
      return this.$ref?.getBoundingClientRect()
    })
  }

}
